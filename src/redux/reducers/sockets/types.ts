import { IAssetPairsData } from '../assetPairs/types';
import {
	IOpenOrdersUpdateResponseDataPayload,
	IOrderBookData,
	IRecentTradesItem,
} from '../spotTrade/types';
import { IWalletsData } from '../wallets/types';

export interface ISocketsStore {
	isSocketConnection: boolean;
	socketToken: string | null;
}

export enum ESocketsStatus {
	SOCKET_OPEN,
	SOCKET_CLOSED,
	SOCKET_SEND_MESSAGE,
}

export type SocketsResponseData = [number, string, ISocketsResponseActionData];

export interface IPrivateNotificationsData {
	message: string;
	title: string;
	type: string;
}

export interface ISocketsResponseActionData {
	action: string;
	data:
		| Array<IRecentTradesItem>
		| IOrderBookData
		| IAssetPairsData
		| IOpenOrdersUpdateResponseDataPayload
		| IPrivateNotificationsData
		| IWalletsData;
}
