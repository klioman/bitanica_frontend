import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import L from 'i18n-react';
import { api } from 'services';
import { notificationContainer } from 'services/utils/notificationContainer';
import { responseErrors } from 'services/http/responseErrors';
import { authInitState } from 'redux/reducers/auth/reducer';
import {
	changeUserPassRequest,
	changeUserPassSuccess,
	check2faEnablesRequest,
	check2faEnablesSuccess,
	disable2faRequest,
	disable2faSuccess,
	enable2faRequest,
	enable2faSuccess,
	generate2faKeyRequest,
	generate2faKeySuccess,
	settingsInitState,
	userSettingsRequest,
	userSettingsSuccess,
} from './reducer';
import {
	IChangePassPayload,
	ICheck2faEnables,
	IDisable2faPayload,
	IEnable2faPayload,
	IGenerate2faKeyResponse,
	IUserSettings,
} from './types';

// =============================================================:
function* userSettingsWorker() {
	try {
		yield put(showLoading());
		const response: IUserSettings = yield call(api.settings.userSettings);
		yield put(userSettingsSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(settingsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* changeUserPassWorker(action: PayloadAction<IChangePassPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.settings.changePassword, payload);
		yield put(changeUserPassSuccess());
		yield put(authInitState());

		notificationContainer(String(L.translate(`Errors.password_successfully_changed`)), 'success');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(settingsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* generate2faKeyWorker() {
	try {
		yield put(showLoading());
		const response: IGenerate2faKeyResponse = yield call(api.settings.generate2faKey);
		yield put(generate2faKeySuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(settingsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* check2faEnablesWorker() {
	try {
		yield put(showLoading());
		const response: ICheck2faEnables = yield call(api.settings.check2faEnables);
		yield put(check2faEnablesSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(settingsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* enable2faWorker(action: PayloadAction<IEnable2faPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.settings.enable2fa, payload);
		yield put(enable2faSuccess());
		yield put(check2faEnablesRequest());
		notificationContainer(String(L.translate(`Errors.google_2fa_activated`)), 'success');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* disable2faWorker(action: PayloadAction<IDisable2faPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.settings.disable2fa, payload);
		yield put(disable2faSuccess());
		yield put(check2faEnablesRequest());
		notificationContainer(String(L.translate(`Errors.google_2fa_turned_off`)), 'success');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* settingsSaga() {
	yield takeEvery(userSettingsRequest.type, userSettingsWorker);
	yield takeEvery(changeUserPassRequest.type, changeUserPassWorker);
	yield takeEvery(check2faEnablesRequest.type, check2faEnablesWorker);
	yield takeEvery(generate2faKeyRequest.type, generate2faKeyWorker);
	yield takeEvery(enable2faRequest.type, enable2faWorker);
	yield takeEvery(disable2faRequest.type, disable2faWorker);
}
