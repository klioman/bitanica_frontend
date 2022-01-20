import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { getAssetsRequest, getAssetsSuccess, assetsInitState } from './reducer';
import { IAssetsResponsePayload } from './types';

// =============================================================:
function* assetsRequestWorker() {
	try {
		yield put(showLoading());
		const response: IAssetsResponsePayload = yield call(api.assets.getAssets);

		yield put(getAssetsSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(assetsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* assetsSaga() {
	yield takeEvery(getAssetsRequest.type, assetsRequestWorker);
}
