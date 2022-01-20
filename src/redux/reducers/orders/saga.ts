import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import {
	calculateLimitOrderRequest,
	calculateLimitOrderSuccess,
	calculateMarketOrderRequest,
	calculateMarketOrderSuccess,
	createOrderRequest,
	createOrderSuccess,
	createStopLimitOrderRequest,
	createStopLimitOrderSuccess,
	ordersInitState,
} from './reducer';
import {
	ICalculateLimitOrderRequestPayload,
	ICalculateLimitOrderResponsePayload,
	ICalculateMarketOrderRequestPayload,
	ICalculateMarketOrderResponsePayload,
	ICreateOrderRequestPayload,
	ICreateStopLimitOrderRequestPayload,
} from './types';

// =============================================================:
function* calculateLimitOrderRequestWorker(
	action: PayloadAction<ICalculateLimitOrderRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: ICalculateLimitOrderResponsePayload = yield call(
			api.orders.calculateLimitOrder,
			payload,
		);

		yield put(calculateLimitOrderSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(ordersInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* calculateMarketOrderRequestWorker(
	action: PayloadAction<ICalculateMarketOrderRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: ICalculateMarketOrderResponsePayload = yield call(
			api.orders.calculateMarketOrder,
			payload,
		);

		yield put(calculateMarketOrderSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(ordersInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* creteOrderRequestWorker(action: PayloadAction<ICreateOrderRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.orders.createOrder, payload);

		yield put(createOrderSuccess());
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(ordersInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* creteStopLimitOrderRequestWorker(
	action: PayloadAction<ICreateStopLimitOrderRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.orders.createStopLimitOrder, payload);

		yield put(createStopLimitOrderSuccess());
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(ordersInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* ordersSaga() {
	yield takeEvery(calculateLimitOrderRequest.type, calculateLimitOrderRequestWorker);
	yield takeEvery(calculateMarketOrderRequest.type, calculateMarketOrderRequestWorker);
	yield takeEvery(createOrderRequest.type, creteOrderRequestWorker);
	yield takeEvery(createStopLimitOrderRequest.type, creteStopLimitOrderRequestWorker);
}
