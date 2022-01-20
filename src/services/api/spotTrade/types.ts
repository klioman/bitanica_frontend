import { AxiosPromise } from 'axios';
import {
	IOpenOrdersRequestPayload,
	IOpenOrdersResponsePayload,
	IOrderbookRequestPayload,
	IOrderbookResponsePayload,
	IOrdersHistoryRequestPayload,
	IOrdersHistoryResponsePayload,
	IRecentTradesRequestPayload,
	IRecentTradesResponsePayload,
	IRemoveAllOpenOrdersRequestPayload,
	IRemoveOpenOrderRequestPayload,
	IUserTradesRequestPayload,
	IUserTradesResponsePayload,
} from 'redux/reducers/spotTrade/types';

// ==========================================:
export interface ISpotTradeApi {
	getOrderbook: (payload: IOrderbookRequestPayload) => Promise<IOrderbookResponsePayload>;
	getRecentTrades: (payload: IRecentTradesRequestPayload) => Promise<IRecentTradesResponsePayload>;
	getUserTrades: (payload: IUserTradesRequestPayload) => Promise<IUserTradesResponsePayload>;
	getUserOpenOrders: (payload: IOpenOrdersRequestPayload) => Promise<IOpenOrdersResponsePayload>;
	removeUserOpenOrder: (payload: IRemoveOpenOrderRequestPayload) => AxiosPromise;
	removeAllUserOpenOrders: (payload: IRemoveAllOpenOrdersRequestPayload) => AxiosPromise;
	getUserOrdersHistory: (
		payload: IOrdersHistoryRequestPayload,
	) => Promise<IOrdersHistoryResponsePayload>;
}
