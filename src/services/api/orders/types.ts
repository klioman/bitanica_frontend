import {
	ICalculateLimitOrderRequestPayload,
	ICalculateLimitOrderResponsePayload,
	ICalculateMarketOrderRequestPayload,
	ICalculateMarketOrderResponsePayload,
	ICreateOrderRequestPayload,
	ICreateOrderResponsePayload,
	ICreateStopLimitOrderRequestPayload,
	ICreateStopLimitOrderResponsePayload,
} from 'redux/reducers/orders/types';

// ==========================================:
export interface IOrdersApi {
	calculateLimitOrder: (
		payload: ICalculateLimitOrderRequestPayload,
	) => Promise<ICalculateLimitOrderResponsePayload>;
	calculateMarketOrder: (
		payload: ICalculateMarketOrderRequestPayload,
	) => Promise<ICalculateMarketOrderResponsePayload>;
	createOrder: (payload: ICreateOrderRequestPayload) => Promise<ICreateOrderResponsePayload>;
	createStopLimitOrder: (
		payload: ICreateStopLimitOrderRequestPayload,
	) => Promise<ICreateStopLimitOrderResponsePayload>;
}
