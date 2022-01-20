import { store } from 'redux/store';
import {
	getExchangeRateRequest,
	getExchangeRateSuccess,
	convertInitState,
	makeExchangeRequest,
	makeExchangeSuccess,
} from './reducer';
import { IConvertStore } from './types';

// ================================================:
describe('Convert reducer:', () => {
	it('Get convert initial state', () => {
		store.dispatch(convertInitState());

		const state: IConvertStore = store.getState().convert;

		expect(state.exchangeRateLoader).toBeFalsy();
		expect(state.exchangeRate).toEqual(null);
		expect(state.makeExchangeLoader).toBeFalsy();
	});

	it('Get exchange rate request', () => {
		const state: IConvertStore = store.getState().convert;

		expect(state.exchangeRateLoader).toBeFalsy();

		const testExhangeRateRequestData = {
			from_asset_id: 1,
			to_asset_id: 2,
		};

		store.dispatch(getExchangeRateRequest(testExhangeRateRequestData));

		const afterState: IConvertStore = store.getState().convert;
		expect(afterState.exchangeRateLoader).toBeTruthy();
	});

	it('Get exchange rate success', () => {
		const testExhangeRateSuccessData = {
			balance: 0,
			rate: '45447.5646261',
		};

		store.dispatch(getExchangeRateSuccess(testExhangeRateSuccessData));
		const storeAfterRequest: IConvertStore = store.getState().convert;

		expect(storeAfterRequest.exchangeRateLoader).toBeFalsy();
		expect(storeAfterRequest.exchangeRate).toEqual(testExhangeRateSuccessData);
	});

	it('Make exchange rate request', () => {
		const state: IConvertStore = store.getState().convert;

		expect(state.makeExchangeLoader).toBeFalsy();

		const testMakeExhangeRequestData = {
			from_asset_id: 1,
			to_asset_id: 2,
			quantity: 10,
		};

		store.dispatch(makeExchangeRequest(testMakeExhangeRequestData));

		const afterState: IConvertStore = store.getState().convert;
		expect(afterState.makeExchangeLoader).toBeTruthy();
	});

	it('Make exchange rate success', () => {
		const state: IConvertStore = store.getState().convert;

		expect(state.makeExchangeLoader).toBeTruthy();

		store.dispatch(makeExchangeSuccess());

		const storeAfterRequest: IConvertStore = store.getState().convert;

		expect(storeAfterRequest.makeExchangeLoader).toBeFalsy();
	});
});
