import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import {
	getAssetPairsRequest,
	getAssetPairsSuccess,
	getAssetPairsFeesAndLimitsRequest,
	getAssetPairsFeesAndLimitsSuccess,
	assetPairsInitState,
} from './reducer';
import { IAssetPairsFeesAndLimitsResponsePayload, IAssetPairsResponsePayload } from './types';

// =============================================================:
function* assetPairsRequestWorker() {
	try {
		yield put(showLoading());
		const response: IAssetPairsResponsePayload = yield call(api.assetPairs.getAssetPairs);

		yield put(getAssetPairsSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(assetPairsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* assetPairsFeesAndLimitsRequestWorker() {
	try {
		yield put(showLoading());
		const response: IAssetPairsFeesAndLimitsResponsePayload = yield call(
			api.assetPairs.getAssetPairsFeesAndLimits,
		);

		yield put(getAssetPairsFeesAndLimitsSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(assetPairsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* assetPairsSaga() {
	yield takeEvery(getAssetPairsRequest.type, assetPairsRequestWorker);
	yield takeEvery(getAssetPairsFeesAndLimitsRequest.type, assetPairsFeesAndLimitsRequestWorker);
}
