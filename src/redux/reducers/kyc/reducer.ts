import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	IKycStore,
	IKycOndatoURLRequestPayload,
	IKycOndatoURLResponsePayload,
	IKycOndatoUserDataResponsePayload,
} from './types';

// ================================================:
export const initialState: IKycStore = {
	kycOndatoURL: null,
	kycOndatoURLLoader: false,
	kycOndatoUserData: null,
	kycOndatoUserDataLoader: false,
};

// ================================================:
const kyc = createSlice({
	name: '@@kyc',
	initialState,
	reducers: {
		getKycOndatoURLRequest: (state, action: PayloadAction<IKycOndatoURLRequestPayload>) => {
			const kycOndatoURLRequestState = state;

			kycOndatoURLRequestState.kycOndatoURLLoader = true;
		},

		getKycOndatoURLSuccess: (state, action: PayloadAction<IKycOndatoURLResponsePayload>) => {
			const { payload } = action;
			const kycOndatoURLSuccessState = state;

			kycOndatoURLSuccessState.kycOndatoURL = payload;
			kycOndatoURLSuccessState.kycOndatoURLLoader = false;
		},

		getKycOndatoUserDataRequest: (state) => {
			const kycOndatoUserDataRequestState = state;

			kycOndatoUserDataRequestState.kycOndatoUserDataLoader = true;
		},

		getKycOndatoUserDataSuccess: (
			state,
			action: PayloadAction<IKycOndatoUserDataResponsePayload>,
		) => {
			const { payload } = action;
			const kycOndatoUserDataSuccessState = state;

			kycOndatoUserDataSuccessState.kycOndatoUserData = payload;
			kycOndatoUserDataSuccessState.kycOndatoUserDataLoader = false;
		},

		kycInitState: () => initialState,
	},
});

export default kyc.reducer;
export const {
	getKycOndatoURLRequest,
	getKycOndatoURLSuccess,
	getKycOndatoUserDataRequest,
	getKycOndatoUserDataSuccess,
	kycInitState,
} = kyc.actions;
