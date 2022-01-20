/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import { tradingSettingsInitState } from './reducer';

// =============================================================:
function* tradingSettingsRequestWorkerExample(action: PayloadAction<any>) {
	// const { payload } = action;

	try {
		yield put(showLoading());
		// const response:  = yield call(api.tradingSettings.example, payload);

		// yield put((tradingSettingsExampleSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(tradingSettingsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* tradingSettingsSaga() {
	// yield takeEvery(tradingSettingsExampleRequest.type, tradingSettingsRequestWorkerExample);
}
