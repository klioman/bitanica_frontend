import {
	ICalculateLimitOrderResponsePayload,
	ICalculateMarketOrderResponsePayload,
	ICreateOrderResponsePayload,
	ICreateStopLimitOrderResponsePayload,
} from 'redux/reducers/orders/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IOrdersApi } from './types';

// ==========================================:
export const orders: IOrdersApi = {
	calculateLimitOrder: (payload) =>
		http
			.post<ICalculateLimitOrderResponsePayload>(endpoint.orders.CALCULATE_LIMIT_ORDER, payload)
			.then((response) => response.data),
	calculateMarketOrder: (payload) =>
		http
			.post<ICalculateMarketOrderResponsePayload>(endpoint.orders.CALCULATE_MARKET_ORDER, payload)
			.then((response) => response.data),
	createOrder: (payload) =>
		http
			.post<ICreateOrderResponsePayload>(endpoint.orders.CREATE_ORDER, payload)
			.then((response) => response.data),
	createStopLimitOrder: (payload) =>
		http
			.post<ICreateStopLimitOrderResponsePayload>(endpoint.orders.CREATE_STOP_LIMIT_ORDER, payload)
			.then((response) => response.data),
};
