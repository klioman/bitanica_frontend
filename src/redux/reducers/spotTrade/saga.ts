import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import {
	getOrderBookRequest,
	getOrderBookSuccess,
	getRecentTradesRequest,
	getRecentTradesSuccess,
	getUserTradesRequest,
	getUserTradesSuccess,
	getOpenOrdersRequest,
	getOpenOrdersSuccess,
	spotTradeInitState,
	getOrdersHistoryRequest,
	getOrdersHistorySuccess,
	removeOpenOrdersRequest,
	removeOpenOrdersSuccess,
	removeAllOpenOrdersRequest,
	removeAllOpenOrdersSuccess,
} from './reducer';
import {
	IOpenOrdersRequestPayload,
	IOpenOrdersResponsePayload,
	IOrderbookRequestPayload,
	IOrderbookResponsePayload,
	IOrdersHistoryRequestPayload,
	IOrdersHistoryResponsePayload,
	IRecentTradesRequestPayload,
	IRecentTradesResponsePayload,
	IRemoveAllOpenOrdersRequestPayload,
	IRemoveOpenOrderRequestPayload,
	IUserTradesRequestPayload,
	IUserTradesResponsePayload,
} from './types';

// =============================================================:
function* orderBookRequestWorker(action: PayloadAction<IOrderbookRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IOrderbookResponsePayload = yield call(api.spotTrade.getOrderbook, payload);

		yield put(getOrderBookSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* recentTradesRequestWorker(action: PayloadAction<IRecentTradesRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IRecentTradesResponsePayload = yield call(
			api.spotTrade.getRecentTrades,
			payload,
		);

		yield put(getRecentTradesSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* userTradesRequestWorker(action: PayloadAction<IUserTradesRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IUserTradesResponsePayload = yield call(api.spotTrade.getUserTrades, payload);

		yield put(getUserTradesSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* userOpenOrdersRequestWorker(action: PayloadAction<IOpenOrdersRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IOpenOrdersResponsePayload = yield call(
			api.spotTrade.getUserOpenOrders,
			payload,
		);

		yield put(getOpenOrdersSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* userOrderHistoryRequestWorker(action: PayloadAction<IOrdersHistoryRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IOrdersHistoryResponsePayload = yield call(
			api.spotTrade.getUserOrdersHistory,
			payload,
		);

		yield put(getOrdersHistorySuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* removeUserOpenOrderRequestWorker(action: PayloadAction<IRemoveOpenOrderRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.spotTrade.removeUserOpenOrder, payload);

		yield put(removeOpenOrdersSuccess(payload));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* removeUserOpenOrdersRequestWorker(
	action: PayloadAction<IRemoveAllOpenOrdersRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.spotTrade.removeAllUserOpenOrders, payload);

		yield put(removeAllOpenOrdersSuccess(payload));

		notificationContainer('All orders was canceled!', 'success');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(spotTradeInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* spotTradeSaga() {
	yield takeEvery(getOrderBookRequest.type, orderBookRequestWorker);
	yield takeEvery(getRecentTradesRequest.type, recentTradesRequestWorker);
	yield takeEvery(getUserTradesRequest.type, userTradesRequestWorker);
	yield takeEvery(getOpenOrdersRequest.type, userOpenOrdersRequestWorker);
	yield takeEvery(removeOpenOrdersRequest.type, removeUserOpenOrderRequestWorker);
	yield takeEvery(removeAllOpenOrdersRequest.type, removeUserOpenOrdersRequestWorker);
	yield takeEvery(getOrdersHistoryRequest.type, userOrderHistoryRequestWorker);
}
