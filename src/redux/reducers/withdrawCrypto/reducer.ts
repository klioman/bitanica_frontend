/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IConfyrmCryptoWithdrawalRequestPayload,
	ICheckWithdrawalAddressRequestPayload,
	ICheckWithdrawalAddressResponsePayload,
	IWitdrawCryptoStore,
} from './types';

// ==========================================:
export const initialState: IWitdrawCryptoStore = {
	toWithdrawalAddresIsValid: true,
	checkWithdrawalAddressLoader: false,
	confirmWithdrawLoader: false,
};

// ==========================================:
const withdrawCrypto = createSlice({
	name: '@@withdrawCrypto',
	initialState,
	reducers: {
		checkWithdrawalAddressRequest: (
			state,
			action: PayloadAction<ICheckWithdrawalAddressRequestPayload>,
		) => {
			const checkWithdrawalAddressRequestState = state;

			checkWithdrawalAddressRequestState.checkWithdrawalAddressLoader = true;
			checkWithdrawalAddressRequestState.toWithdrawalAddresIsValid = true;
		},

		checkWithdrawalAddressSuccess: (
			state,
			action: PayloadAction<ICheckWithdrawalAddressResponsePayload>,
		) => {
			const { payload } = action;
			const checkWithdrawalAddressSuccessState = state;

			checkWithdrawalAddressSuccessState.toWithdrawalAddresIsValid = payload.is_valid;
			checkWithdrawalAddressSuccessState.checkWithdrawalAddressLoader = false;
		},

		sendWithdrawCryptoEmailCodeRequest: (state) => state,

		confirmCryptoWithdrawRequest: (
			state,
			action: PayloadAction<IConfyrmCryptoWithdrawalRequestPayload>,
		) => {
			const confirmCryptoWithdrawRequestState = state;

			confirmCryptoWithdrawRequestState.confirmWithdrawLoader = true;
		},

		confirmCryptoWithdrawSuccess: (state) => {
			const confirmCryptoWithdrawRequestState = state;

			confirmCryptoWithdrawRequestState.confirmWithdrawLoader = false;
		},

		withdrawCryptoInitState: () => initialState,
	},
});

export default withdrawCrypto.reducer;
export const {
	checkWithdrawalAddressRequest,
	checkWithdrawalAddressSuccess,
	sendWithdrawCryptoEmailCodeRequest,
	confirmCryptoWithdrawRequest,
	confirmCryptoWithdrawSuccess,
	withdrawCryptoInitState,
} = withdrawCrypto.actions;
