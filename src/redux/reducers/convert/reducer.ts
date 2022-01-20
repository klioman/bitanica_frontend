import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	IConvertStore,
	IExchangeRateRequestPayload,
	IExchangeRateResponsePayload,
	ICreateExchangeRequestPayload,
} from './types';

// ================================================:
export const initialState: IConvertStore = {
	exchangeRate: null,
	exchangeRateLoader: false,
	makeExchangeLoader: false,
};

// ================================================:
const convert = createSlice({
	name: '@@convert',
	initialState,
	reducers: {
		getExchangeRateRequest: (state, action: PayloadAction<IExchangeRateRequestPayload>) => {
			const exchangeRateRequestState = state;

			exchangeRateRequestState.exchangeRateLoader = true;
		},

		getExchangeRateSuccess: (state, action: PayloadAction<IExchangeRateResponsePayload>) => {
			const { payload } = action;
			const exchangeRateSuccessState = state;

			exchangeRateSuccessState.exchangeRate = payload;
			exchangeRateSuccessState.exchangeRateLoader = false;
		},

		makeExchangeRequest: (state, action: PayloadAction<ICreateExchangeRequestPayload>) => {
			const makeExchangeRequestState = state;

			makeExchangeRequestState.makeExchangeLoader = true;
		},

		makeExchangeSuccess: (state) => {
			const makeExchangeSuccessState = state;

			makeExchangeSuccessState.makeExchangeLoader = false;
		},

		convertInitState: () => initialState,
	},
});

export default convert.reducer;
export const {
	getExchangeRateRequest,
	getExchangeRateSuccess,
	makeExchangeRequest,
	makeExchangeSuccess,
	convertInitState,
} = convert.actions;
