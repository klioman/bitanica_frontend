/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IOrderbookRequestPayload,
	IOrderbookResponsePayload,
	IRecentTradesRequestPayload,
	IRecentTradesResponsePayload,
} from 'redux/reducers/spotTrade/types';

// ==========================================:
export interface ITradingChartApi {
	getChartHistory: (payload: any) => Promise<any>;
}
