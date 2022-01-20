import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import {
	checkWithdrawalAddressRequest,
	checkWithdrawalAddressSuccess,
	sendWithdrawCryptoEmailCodeRequest,
	confirmCryptoWithdrawRequest,
	confirmCryptoWithdrawSuccess,
	withdrawCryptoInitState,
} from './reducer';
import {
	ICheckWithdrawalAddressRequestPayload,
	ICheckWithdrawalAddressResponsePayload,
	IConfyrmCryptoWithdrawalRequestPayload,
} from './types';

// =============================================================:
function* checkWithdrawAddressRequestWorker(
	action: PayloadAction<ICheckWithdrawalAddressRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: ICheckWithdrawalAddressResponsePayload = yield call(
			api.withdrawCrypto.checkWithdrawalAddress,
			payload,
		);

		yield put(checkWithdrawalAddressSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(withdrawCryptoInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* sendWithdrawCryptoEmailCodeWorker() {
	try {
		yield put(showLoading());
		yield call(api.withdrawCrypto.sendWithdrawalEmailCode);

		notificationContainer('The code has been sent to your email!', 'info');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error?.response?.status === 429) {
				notificationContainer('Please, try again after countdown finish!', 'error');
				return;
			}

			responseErrors(error);
		}
		yield put(withdrawCryptoInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* confirmWithdrawCryptoWorker(
	action: PayloadAction<IConfyrmCryptoWithdrawalRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.withdrawCrypto.confirmCryptoWithdrawal, payload.data);

		notificationContainer('Withdrawal has been successful!', 'success');

		payload.closeModal();
		payload.history.push('/fiat-and-spot');

		yield put(confirmCryptoWithdrawSuccess());
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(withdrawCryptoInitState());
	} finally {
		yield put(hideLoading());
		payload.setIsConfirmDesabled(false);
	}
}

// =============================================================:
export function* withdrawCryptoSaga() {
	yield takeEvery(checkWithdrawalAddressRequest.type, checkWithdrawAddressRequestWorker);
	yield takeEvery(sendWithdrawCryptoEmailCodeRequest.type, sendWithdrawCryptoEmailCodeWorker);
	yield takeEvery(confirmCryptoWithdrawRequest.type, confirmWithdrawCryptoWorker);
}
