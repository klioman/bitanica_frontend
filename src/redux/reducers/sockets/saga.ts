/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit';
import { take, fork, call, put, race, select } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import L from 'i18n-react';
import { updateBarBySockets } from 'components/Chart/datafeed/stream';
import { WEB_SOCKETS_URL } from 'services/constants/env';
import { notificationContainer } from 'services/utils/notificationContainer';
import {
	IRecentTradesItem,
	IOrderBookData,
	IOpenOrdersUpdateResponseDataPayload,
	IOrdersHistoryUpdateResponseDataPayload,
} from '../spotTrade/types';
import {
	setSocketsConnect,
	setSocketsDisconnect,
	socketClosedConnection,
	socketOpenConnection,
	socketSendMessage,
} from './reducer';
import { updateAssetPairsSuccess } from '../assetPairs/reducer';
import {
	updateOpenOrdersSuccess,
	updateOrderBookSuccess,
	updateOrdersHistorySuccess,
	updateRecentTradesSuccess,
} from '../spotTrade/reducer';
import { getSpotRecentTrades } from '../spotTrade/selectors';

import { IPrivateNotificationsData, SocketsResponseData } from './types';
import { IAssetPairsData } from '../assetPairs/types';
import { IWalletsData } from '../wallets/types';
import { updateWalletsSuccess } from '../wallets/reducer';

export const socketConnection = (socketToken: string | null) => {
	return new Promise((resolve, reject) => {
		let socket: WebSocket;

		if (socketToken) {
			socket = new WebSocket(`${String(WEB_SOCKETS_URL)}/?${socketToken}`, ['wamp']);
		} else {
			socket = new WebSocket(`${String(WEB_SOCKETS_URL)}`, ['wamp']);
		}

		socket.onopen = () => {
			resolve(socket);
			// console.log('Connection open...');
		};
		socket.onerror = (event) => {
			reject(event);
		};
		socket.onclose = (event) => {
			if (event.wasClean) {
				// console.log('Connection closed...');
			} else {
				// console.log('Lost connection...');
			}
		};
	});
};

export const socketChannel = (socketValue: WebSocket) => {
	const socket = socketValue;

	return eventChannel((emiter) => {
		socket.onmessage = ({ data }) => {
			emiter(JSON.parse(data));
		};
		return () => {
			socket.close();
		};
	});
};

function* socketSend(socket: WebSocket) {
	const isOpenSocket = socket.readyState === socket.OPEN;

	if (isOpenSocket) {
		while (true) {
			const { payload }: { payload: PayloadAction } = yield take(socketSendMessage.type);
			socket.send(JSON.stringify(payload));
		}
	}
}

function* socketClose(socket: WebSocket) {
	while (true) {
		yield take(socketClosedConnection.type);
		yield put(setSocketsDisconnect());

		socket.close();
	}
}
function* socketOnmessage(channel: EventChannel<SocketsResponseData>) {
	while (true) {
		const data: SocketsResponseData = yield take(channel);

		if (+data[0] === 8) {
			switch (data[1].split(':')[0]) {
				case 'assets_pairs':
					const assetPairsUpdatedData = data[2].data as IAssetPairsData;

					yield put(updateAssetPairsSuccess(assetPairsUpdatedData));
					break;
				case 'order_book':
					const orderBookUpdatedData = data[2].data as IOrderBookData;

					yield put(updateOrderBookSuccess(orderBookUpdatedData));
					break;
				case 'trades':
					const recentTradesUpdatedData = data[2].data as Array<IRecentTradesItem>;

					let currentRecentTrades: Array<IRecentTradesItem>;

					const spotRecentTrades: Array<IRecentTradesItem> = yield select(getSpotRecentTrades);

					if (spotRecentTrades) {
						currentRecentTrades = spotRecentTrades;
					} else {
						currentRecentTrades = [];
					}

					const newRecentTrades: Array<IRecentTradesItem> = yield [
						...recentTradesUpdatedData,
						...currentRecentTrades,
					].slice(0, 100);

					yield put(updateRecentTradesSuccess(newRecentTrades));

					if (recentTradesUpdatedData.length) {
						yield recentTradesUpdatedData.reverse().map((item) =>
							updateBarBySockets({
								price: +item.price,
								time: +item.created_at * 1000,
								volume: +item.quantity,
							}),
						);
					}
					break;
				case 'open_orders':
					switch (data[1].split(':')[1]) {
						case 'spot':
							const openOrdersUpdatedData = data[2].data as IOpenOrdersUpdateResponseDataPayload;

							yield put(updateOpenOrdersSuccess(openOrdersUpdatedData));
							break;

						default:
							break;
					}

					break;
				case 'closed_orders':
					switch (data[1].split(':')[1]) {
						case 'spot':
							const closedOrdersUpdatedData = data[2]
								.data as IOrdersHistoryUpdateResponseDataPayload;

							yield put(updateOrdersHistorySuccess(closedOrdersUpdatedData));
							break;

						default:
							break;
					}

					break;
				case 'private-notifications':
					const { message, type } = data[2].data as IPrivateNotificationsData;

					notificationContainer(`${String(message)}`, type);
					break;
				case 'balances':
					const waleltsUpdatedData = data[2].data as IWalletsData;

					yield put(updateWalletsSuccess(waleltsUpdatedData));
					break;

				default:
					break;
			}
		}
	}
}

export function* socketsSaga() {
	try {
		while (true) {
			const { payload }: { payload: PayloadAction } = yield take(socketOpenConnection.type);
			const socketToken: any = payload; // TODO: add types

			const socket: WebSocket = yield call(socketConnection, socketToken);
			const channel: EventChannel<any> = yield call(socketChannel, socket);

			if (socket.onopen) {
				yield put(setSocketsConnect());
			}

			yield fork(socketSend, socket);
			yield fork(socketClose, socket);

			const { cancel } = yield race({
				task: call(socketOnmessage, channel),
				cancel: take(socketClosedConnection.type),
			});

			if (cancel) {
				channel.close();
			}
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('websockets_error', error);
		// eslint-disable-next-line no-console
		console.dir('websockets_error', error);
		notificationContainer(String(L.translate(`Errors.websockets_error`)), 'error');
	}
}
