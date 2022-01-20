/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ICalculateLimitOrderRequestPayload,
	ICalculateLimitOrderResponsePayload,
	ICalculateMarketOrderRequestPayload,
	ICalculateMarketOrderResponsePayload,
	ICreateOrderRequestPayload,
	ICreateStopLimitOrderRequestPayload,
	IOrdersStore,
} from './types';

// ==========================================:
export const initialState: IOrdersStore = {
	calculate: {
		limitOrder: null,
		marketOrder: null,
	},
	tempOrderPrice: 0,
};

// ==========================================:
const orders = createSlice({
	name: '@@orders',
	initialState,
	reducers: {
		calculateLimitOrderRequest: (
			state,
			action: PayloadAction<ICalculateLimitOrderRequestPayload>,
		) => {},

		calculateLimitOrderSuccess: (
			state,
			action: PayloadAction<ICalculateLimitOrderResponsePayload>,
		) => {
			const { payload } = action;
			const calculateLimitOrderState = state;

			calculateLimitOrderState.calculate.limitOrder = payload.data;
		},

		calculateMarketOrderRequest: (
			state,
			action: PayloadAction<ICalculateMarketOrderRequestPayload>,
		) => {},

		calculateMarketOrderSuccess: (
			state,
			action: PayloadAction<ICalculateMarketOrderResponsePayload>,
		) => {
			const { payload } = action;
			const calculateMarketOrderState = state;

			calculateMarketOrderState.calculate.marketOrder = payload.data;
		},

		createOrderRequest: (state, action: PayloadAction<ICreateOrderRequestPayload>) => {},

		createOrderSuccess: (state) => {},

		createStopLimitOrderRequest: (
			state,
			action: PayloadAction<ICreateStopLimitOrderRequestPayload>,
		) => {},

		createStopLimitOrderSuccess: (state) => {},

		setTempOrderPrice: (state, action: PayloadAction<number>) => {
			const { payload } = action;
			const tempOrderPriceState = state;

			tempOrderPriceState.tempOrderPrice = payload;
		},

		ordersInitState: () => initialState,
	},
});

export default orders.reducer;
export const {
	calculateLimitOrderRequest,
	calculateLimitOrderSuccess,
	calculateMarketOrderRequest,
	calculateMarketOrderSuccess,
	createOrderRequest,
	createOrderSuccess,
	createStopLimitOrderRequest,
	createStopLimitOrderSuccess,
	setTempOrderPrice,
	ordersInitState,
} = orders.actions;
