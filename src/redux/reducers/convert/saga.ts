import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import {
	getExchangeRateRequest,
	getExchangeRateSuccess,
	makeExchangeRequest,
	makeExchangeSuccess,
	convertInitState,
} from './reducer';
import {
	ICreateExchangeRequestPayload,
	IExchangeRateRequestPayload,
	IExchangeRateResponsePayload,
} from './types';

// =============================================================:
function* exhangeRateRequestWorker(action: PayloadAction<IExchangeRateRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IExchangeRateResponsePayload = yield call(api.convert.getExchangeRate, payload);

		yield put(getExchangeRateSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(convertInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* makeExhangeRequestWorker(action: PayloadAction<ICreateExchangeRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.convert.makeExchange, payload);

		yield put(makeExchangeSuccess());

		notificationContainer('Converting has been successfully!', 'success');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* convertSaga() {
	yield takeEvery(getExchangeRateRequest.type, exhangeRateRequestWorker);
	yield takeEvery(makeExchangeRequest.type, makeExhangeRequestWorker);
}
