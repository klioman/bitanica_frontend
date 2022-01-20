import { AxiosPromise } from 'axios';
import {
	ICreateExchangeRequestPayload,
	IExchangeRateRequestPayload,
	IExchangeRateResponsePayload,
} from 'redux/reducers/convert/types';

// ==========================================:
export interface IConvertApi {
	getExchangeRate: (payload: IExchangeRateRequestPayload) => Promise<IExchangeRateResponsePayload>;
	makeExchange: (payload: ICreateExchangeRequestPayload) => AxiosPromise;
}
