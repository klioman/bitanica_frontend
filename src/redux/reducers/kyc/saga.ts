import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import { windowReference } from 'services/utils/windowRefference';
import {
	getKycOndatoURLRequest,
	getKycOndatoURLSuccess,
	getKycOndatoUserDataRequest,
	getKycOndatoUserDataSuccess,
	kycInitState,
} from './reducer';
import {
	IKycOndatoURLRequestPayload,
	IKycOndatoURLResponsePayload,
	IKycOndatoUserDataResponsePayload,
} from './types';

// =============================================================:
function* getKycOndatoURLWorker(action: PayloadAction<IKycOndatoURLRequestPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IKycOndatoURLResponsePayload = yield call(api.kyc.getKycOndatoUrl, payload);

		yield put(getKycOndatoURLSuccess(response));

		if (response?.url) {
			const ios = /iPhone|iPad|iPod/i;
			if (ios.exec(navigator?.userAgent) && payload.setIosLink) {
				payload.setIosLink({ url: response?.url || '', params: {} });

				notificationContainer('Generate link success', 'info');
			} else {
				windowReference(response?.url);

				notificationContainer('Open Ondato KYC', 'info');
			}
		} else {
			notificationContainer('Open Ondato KYC site wrong', 'error');
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(kycInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* getKycOndatoUserDataWorker() {
	try {
		yield put(showLoading());
		const response: IKycOndatoUserDataResponsePayload = yield call(api.kyc.getKycOndatoUserData);

		yield put(getKycOndatoUserDataSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(kycInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* kycSaga() {
	yield takeEvery(getKycOndatoURLRequest.type, getKycOndatoURLWorker);
	yield takeEvery(getKycOndatoUserDataRequest.type, getKycOndatoUserDataWorker);
}
