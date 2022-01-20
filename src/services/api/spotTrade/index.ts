/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IOpenOrdersResponsePayload,
	IOrderbookResponsePayload,
	IOrdersHistoryResponsePayload,
	IRecentTradesResponsePayload,
	IUserTradesResponsePayload,
} from 'redux/reducers/spotTrade/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { ISpotTradeApi } from './types';

// ==========================================:
export const spotTrade: ISpotTradeApi = {
	getOrderbook: ({ pair, params }) =>
		http
			.get<IOrderbookResponsePayload>(endpoint.spotTrade.ORDER_BOOK(pair), { params })
			.then((response) => response.data),
	getRecentTrades: ({ pair, params }) =>
		http
			.get<IRecentTradesResponsePayload>(endpoint.spotTrade.RECENT_TRADES(pair), { params })
			.then((response) => response.data),
	getUserTrades: ({ params }) =>
		http
			.get<IUserTradesResponsePayload>(endpoint.spotTrade.USER_TRADES, { params })
			.then((response) => response.data),
	getUserOpenOrders: ({ params }) =>
		http
			.get<IOpenOrdersResponsePayload>(endpoint.spotTrade.USER_OPEN_ORDERS, { params })
			.then((response) => response.data),
	removeUserOpenOrder: ({ id }) =>
		http.post<any>(endpoint.spotTrade.REMOVE_OPEN_ORDER(id)).then((response) => response.data),
	removeAllUserOpenOrders: (payload) =>
		http
			.post<any>(endpoint.spotTrade.REMOVE_ALL_OPEN_ORDERS, payload)
			.then((response) => response.data),
	getUserOrdersHistory: ({ params }) =>
		http
			.get<IOrdersHistoryResponsePayload>(endpoint.spotTrade.USER_CLOSED_ORDERS, { params })
			.then((response) => response.data),
};
