/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IOrderbookRequestPayload,
	IOrderbookResponsePayload,
	IRecentTradesRequestPayload,
	IRecentTradesResponsePayload,
	IUserTradesRequestPayload,
	IUserTradesResponsePayload,
	ISpotTradeStore,
	IOpenOrdersRequestPayload,
	IOpenOrdersResponsePayload,
	IOrdersHistoryRequestPayload,
	IOrdersHistoryResponsePayload,
	IRemoveOpenOrderRequestPayload,
	IOpenOrdersData,
	IRemoveAllOpenOrdersRequestPayload,
	IOpenOrdersUpdateResponseDataPayload,
	IOrdersHistoryUpdateResponseDataPayload,
	IOrdersHistoryData,
} from './types';

// ================================================:
export const initialState: ISpotTradeStore = {
	orderBook: null,
	orderBookLoader: false,
	recentTrades: null,
	recentTradesLoader: false,
	userTrades: null,
	userTradesLoader: false,
	tablesHistory: {
		openOrders: null,
		openOrdersLoader: false,
		ordersHistory: null,
		ordersHistoryLoader: false,
	},
};

// ================================================:
const spotTrade = createSlice({
	name: '@@spotTrade',
	initialState,
	reducers: {
		getOrderBookRequest: (state, action: PayloadAction<IOrderbookRequestPayload>) => {
			const orderBookRequestState = state;

			orderBookRequestState.orderBookLoader = true;
		},
		getOrderBookSuccess: (state, action: PayloadAction<IOrderbookResponsePayload>) => {
			const { payload } = action;
			const orderBookSuccessState = state;

			orderBookSuccessState.orderBook = payload;
			orderBookSuccessState.orderBookLoader = false;
		},
		updateOrderBookSuccess: (state, action: PayloadAction<IOrderbookResponsePayload>) => {
			const { payload } = action;
			const orderBookUpdateState = state;

			orderBookUpdateState.orderBook = payload;
			orderBookUpdateState.orderBookLoader = false;
		},

		getRecentTradesRequest: (state, action: PayloadAction<IRecentTradesRequestPayload>) => {
			const recentTradesRequestState = state;

			recentTradesRequestState.recentTradesLoader = true;
		},
		getRecentTradesSuccess: (state, action: PayloadAction<IRecentTradesResponsePayload>) => {
			const { payload } = action;
			const recentTradesSuccessState = state;

			recentTradesSuccessState.recentTrades = payload;
			recentTradesSuccessState.recentTradesLoader = false;
		},
		updateRecentTradesSuccess: (state, action: PayloadAction<IRecentTradesResponsePayload>) => {
			const { payload } = action;
			const recentTradesUpdateState = state;

			recentTradesUpdateState.recentTrades = payload;
			recentTradesUpdateState.recentTradesLoader = false;
		},

		getUserTradesRequest: (state, action: PayloadAction<IUserTradesRequestPayload>) => {
			const userTradesRequestState = state;

			userTradesRequestState.userTradesLoader = true;
		},
		getUserTradesSuccess: (state, action: PayloadAction<IUserTradesResponsePayload>) => {
			const { payload } = action;
			const userTradesSuccessState = state;

			userTradesSuccessState.userTrades = payload;
			userTradesSuccessState.userTradesLoader = false;
		},

		getOpenOrdersRequest: (state, action: PayloadAction<IOpenOrdersRequestPayload>) => {
			const openOrdersRequestState = state;

			openOrdersRequestState.tablesHistory.openOrdersLoader = true;
		},
		getOpenOrdersSuccess: (state, action: PayloadAction<IOpenOrdersResponsePayload>) => {
			const { payload } = action;
			const openOrdersSuccessState = state;

			openOrdersSuccessState.tablesHistory.openOrders = payload;
			openOrdersSuccessState.tablesHistory.openOrdersLoader = false;
		},
		updateOpenOrdersSuccess: (
			state,
			action: PayloadAction<IOpenOrdersUpdateResponseDataPayload>,
		) => {
			const { payload } = action;
			const openOrdersUpdateState = state;

			openOrdersUpdateState.tablesHistory.openOrders = {
				...openOrdersUpdateState.tablesHistory.openOrders,
				data: payload.orders,
				total: payload?.orders?.length || 0,
			} as IOpenOrdersData;
			openOrdersUpdateState.tablesHistory.openOrdersLoader = false;
		},

		removeOpenOrdersRequest: (state, action: PayloadAction<IRemoveOpenOrderRequestPayload>) => {
			const removeOpenOrdersRequestState = state;

			removeOpenOrdersRequestState.tablesHistory.openOrdersLoader = true;
		},
		removeOpenOrdersSuccess: (state, action: PayloadAction<IRemoveOpenOrderRequestPayload>) => {
			const removeOpenOrdersSuccessState = state;

			removeOpenOrdersSuccessState.tablesHistory.openOrdersLoader = false;
		},

		removeAllOpenOrdersRequest: (
			state,
			action: PayloadAction<IRemoveAllOpenOrdersRequestPayload>,
		) => {
			const removeAllOpenOrdersRequestState = state;

			removeAllOpenOrdersRequestState.tablesHistory.openOrdersLoader = true;
		},
		removeAllOpenOrdersSuccess: (
			state,
			action: PayloadAction<IRemoveAllOpenOrdersRequestPayload>,
		) => {
			const removeAllOpenOrdersSuccessState = state;

			removeAllOpenOrdersSuccessState.tablesHistory.openOrders = {
				...removeAllOpenOrdersSuccessState.tablesHistory.openOrders,
				data: [],
				total: 0,
			} as IOpenOrdersData;
			removeAllOpenOrdersSuccessState.tablesHistory.openOrdersLoader = false;
		},

		getOrdersHistoryRequest: (state, action: PayloadAction<IOrdersHistoryRequestPayload>) => {
			const ordersHistoryRequestState = state;

			ordersHistoryRequestState.tablesHistory.ordersHistoryLoader = true;
		},
		getOrdersHistorySuccess: (state, action: PayloadAction<IOrdersHistoryResponsePayload>) => {
			const { payload } = action;
			const ordersHistorySuccessState = state;

			ordersHistorySuccessState.tablesHistory.ordersHistory = payload;
			ordersHistorySuccessState.tablesHistory.ordersHistoryLoader = false;
		},
		updateOrdersHistorySuccess: (
			state,
			action: PayloadAction<IOrdersHistoryUpdateResponseDataPayload>,
		) => {
			const { payload } = action;
			const ordersHistoryUpdateState = state;

			ordersHistoryUpdateState.tablesHistory.ordersHistory = {
				...ordersHistoryUpdateState.tablesHistory.ordersHistory,
				data: payload.orders,
				total: payload?.orders?.length || 0,
			} as IOrdersHistoryData;
			ordersHistoryUpdateState.tablesHistory.ordersHistoryLoader = false;
		},

		spotTradeInitState: () => initialState,
	},
});

export default spotTrade.reducer;
export const {
	getOrderBookRequest,
	getOrderBookSuccess,
	updateOrderBookSuccess,
	getRecentTradesRequest,
	getRecentTradesSuccess,
	updateRecentTradesSuccess,
	getUserTradesRequest,
	getUserTradesSuccess,
	getOpenOrdersRequest,
	getOpenOrdersSuccess,
	updateOpenOrdersSuccess,
	removeOpenOrdersRequest,
	removeOpenOrdersSuccess,
	removeAllOpenOrdersRequest,
	removeAllOpenOrdersSuccess,
	getOrdersHistoryRequest,
	getOrdersHistorySuccess,
	updateOrdersHistorySuccess,
	spotTradeInitState,
} = spotTrade.actions;
