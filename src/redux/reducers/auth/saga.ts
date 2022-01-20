import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import L from 'i18n-react';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import {
	authInitState,
	createNewPasswordRequest,
	createNewPasswordSuccess,
	emailConfirmRequest,
	emailConfirmStatusCallback,
	emailConfirmStatusRequest,
	emailConfirmSuccess,
	emailResetConfirmTokenRequest,
	emailResetConfirmTokenSuccess,
	forgotPasswordRequest,
	forgotPasswordSuccess,
	ipConfirmRequest,
	ipConfirmSuccess,
	loginRequest,
	loginSuccess,
	logoutRequest,
	registrationRequest,
	registrationSuccess,
} from './reducer';
import {
	ILoginResponse,
	ILoginPayload,
	IRegistrationPayload,
	ILogoutPayload,
	IForgotPasswordPayload,
	ICreateNewPasswordPayload,
	IEmailConfirmPayload,
	IEmailResetConfirmTokenPayload,
	IipConfirmPayload,
} from './types';

// =============================================================:
function* ipConfirmRequestWorker(action: PayloadAction<IipConfirmPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.ipConfirm, payload.data);
		yield put(ipConfirmSuccess());

		notificationContainer(
			String(L.translate('IPConfirmation.ip_confirmation_success_confirm')),
			'info',
		);

		payload.history.push('/login');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(authInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* loginRequestWorker(action: PayloadAction<ILoginPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: ILoginResponse = yield call(api.auth.login, payload.data);
		yield put(loginSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error?.response?.data?.errors[0] === 'ip_not_verified') {
				payload.history.push('/ip-confirmation');
			} else if (error?.response?.data?.errors?.totp) {
				const code: string = error?.response?.data?.errors?.totp[0];
				notificationContainer(String(L.translate(`Errors.${code}`)), 'info');
			} else {
				responseErrors(error);
			}
		}
		yield put(authInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* registrationRequestWorker(action: PayloadAction<IRegistrationPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.registration, payload);
		yield put(registrationSuccess());

		notificationContainer(String(L.translate('Errors.registered_successfully')), 'info');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(authInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* forgotPasswordRequestWorker(action: PayloadAction<IForgotPasswordPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.forgotPassword, payload);
		yield put(forgotPasswordSuccess());

		notificationContainer(String(L.translate('Errors.check_the_email')), 'info');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(authInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* emailConfirmRequestWorker(action: PayloadAction<IEmailConfirmPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.emailConfirm, payload);
		yield put(emailConfirmStatusCallback());
		yield put(emailConfirmSuccess());
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (
				error?.response?.status === 400 &&
				error?.response?.data?.errors[0] === 'email_already_confirmed'
			) {
				yield put(emailConfirmStatusRequest());
			} else {
				responseErrors(error);
				yield put(authInitState());
			}
		}
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* emailResetConfirmTokenRequestWorker(
	action: PayloadAction<IEmailResetConfirmTokenPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.emailResetConfirmToken, payload);
		yield put(emailConfirmStatusCallback());
		yield put(emailResetConfirmTokenSuccess());

		payload.history.replace('/email-confirm-check');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (
				error?.response?.status === 400 &&
				error?.response?.data?.errors[0] === 'email_already_confirmed'
			) {
				yield put(emailConfirmStatusRequest());
			} else {
				responseErrors(error);
				yield put(authInitState());
			}
		}
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* createNewPasswordWorker(action: PayloadAction<ICreateNewPasswordPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.newPassword, payload.data);
		yield put(createNewPasswordSuccess());
		payload.history.push('/login');

		notificationContainer(String(L.translate(`Errors.password_successfully_changed`)), 'success');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(authInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* logoutRequestWorker(action: PayloadAction<ILogoutPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.auth.logout);
		yield put(authInitState());
		payload.history.push({
			search: '',
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(authInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* authSaga() {
	yield takeEvery(loginRequest.type, loginRequestWorker);
	yield takeEvery(ipConfirmRequest.type, ipConfirmRequestWorker);
	yield takeEvery(registrationRequest.type, registrationRequestWorker);
	yield takeEvery(forgotPasswordRequest.type, forgotPasswordRequestWorker);
	yield takeEvery(emailConfirmRequest.type, emailConfirmRequestWorker);
	yield takeEvery(emailResetConfirmTokenRequest.type, emailResetConfirmTokenRequestWorker);
	yield takeEvery(createNewPasswordRequest.type, createNewPasswordWorker);
	yield takeEvery(logoutRequest.type, logoutRequestWorker);
}
