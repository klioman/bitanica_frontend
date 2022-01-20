import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { responseErrors } from 'services/http/responseErrors';
import { notificationContainer } from 'services/utils/notificationContainer';
import {
	getGenerateAddressRequest,
	getGenerateAddressSuccess,
	getWalletsRequest,
	getWalletsSuccess,
	walletsInitState,
	getWalletsCryptoHistorySuccess,
	getWalletsCryptoHistoryRequest,
	exportWalletsCryptoHistory,
} from './reducer';
import {
	IGenerateAddressWalletPayload,
	IGenerateAddressWalletData,
	IWalletsResponsePayload,
	IWalletsCryptoHistoryData,
	IWalletsCryptoHistoryRequestPayload,
} from './types';

// =============================================================:
function* walletsRequestWorker() {
	try {
		yield put(showLoading());
		const response: IWalletsResponsePayload = yield call(api.wallets.getWallets);

		yield put(getWalletsSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(walletsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* getGenerateAddressRequestWorker(action: PayloadAction<IGenerateAddressWalletPayload>) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IGenerateAddressWalletData = yield call(api.wallets.generateAddress, payload);

		yield put(getGenerateAddressSuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(walletsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* getWalletsCryptoHistoryRequestWorker(
	action: PayloadAction<IWalletsCryptoHistoryRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		const response: IWalletsCryptoHistoryData = yield call(
			api.wallets.getWalletsCryptoHistory,
			payload,
		);

		yield put(getWalletsCryptoHistorySuccess(response));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(walletsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
function* exportWalletsCryptoHistoryWorker(
	action: PayloadAction<IWalletsCryptoHistoryRequestPayload>,
) {
	const { payload } = action;

	try {
		yield put(showLoading());
		yield call(api.wallets.getWalletsCryptoHistory, payload);

		notificationContainer('Crypto transaction history was sent to your email!', 'info');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			responseErrors(error);
		}
		yield put(walletsInitState());
	} finally {
		yield put(hideLoading());
	}
}

// =============================================================:
export function* walletsSaga() {
	yield takeEvery(getWalletsRequest.type, walletsRequestWorker);
	yield takeEvery(getGenerateAddressRequest.type, getGenerateAddressRequestWorker);
	yield takeEvery(getWalletsCryptoHistoryRequest.type, getWalletsCryptoHistoryRequestWorker);
	yield takeEvery(exportWalletsCryptoHistory.type, exportWalletsCryptoHistoryWorker);
}
