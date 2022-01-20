import {
	ICreateExchangeRequestPayload,
	IExchangeRateRequestPayload,
	IExchangeRateResponsePayload,
} from 'redux/reducers/convert/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IConvertApi } from './types';

// ==========================================:
export const convert: IConvertApi = {
	getExchangeRate: (payload: IExchangeRateRequestPayload) =>
		http
			.post<IExchangeRateResponsePayload>(endpoint.convert.EXCHANGE_RATE, payload)
			.then((response) => response.data),
	makeExchange: (payload: ICreateExchangeRequestPayload) =>
		http.post(endpoint.convert.MAKE_EXCHANGE, payload).then((response) => response.data),
};
