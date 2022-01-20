import { store } from 'redux/store';
import {
	getAssetPairsRequest,
	getAssetPairsSuccess,
	getAssetPairsFeesAndLimitsRequest,
	getAssetPairsFeesAndLimitsSuccess,
} from './reducer';
import { IAssetPairsStore } from './types';

// ================================================:
describe('Asset pairs reducer:', () => {
	it('Get asset pairs initial state', () => {
		const state: IAssetPairsStore = store.getState().assetPairs;

		expect(state.assetPairsLoader).toBeFalsy();
		expect(state.assetPairs).toEqual(null);
		expect(state.assetPairsFeesAndLimitsLoader).toBeFalsy();
		expect(state.assetPairsFeesAndLimits).toEqual(null);
	});

	it('Get asset pairs list request', () => {
		const state: IAssetPairsStore = store.getState().assetPairs;

		expect(state.assetPairsLoader).toBeFalsy();

		store.dispatch(getAssetPairsRequest());
		const afterState: IAssetPairsStore = store.getState().assetPairs;
		expect(afterState.assetPairsLoader).toBeTruthy();
	});

	it('Get asset pairs list success', () => {
		const testAssetPairsSuccessData = [
			{
				active: 1,
				buy_enabled: 1,
				change24h: -0.23,
				change24h_value: -132.035985,
				code: 'btc_usdt',
				high24: 57302.05464,
				id: 1,
				last_price: 56708.750205,
				last_price_usd: 56708.750205,
				low24: 56072.26984,
				sell_enabled: 1,
				view_decimal: 2,
				volume24h: 1.4907,
				volumeQuote24: 84386.7953,
			},
		];

		store.dispatch(getAssetPairsSuccess(testAssetPairsSuccessData));
		const storeAfterRequest: IAssetPairsStore = store.getState().assetPairs;

		expect(storeAfterRequest.assetPairsLoader).toBeFalsy();
		expect(storeAfterRequest.assetPairs).toEqual(testAssetPairsSuccessData);
	});

	it('Update asset pairs list success', () => {
		const testAssetPairsUpdateData = [
			{
				active: 1,
				buy_enabled: 1,
				change24h: -0.23,
				change24h_value: -132.035985,
				code: 'btc_usdt',
				high24: 57302.05464,
				id: 1,
				last_price: 56708.750205,
				last_price_usd: 56708.750205,
				low24: 56072.26984,
				sell_enabled: 1,
				view_decimal: 2,
				volume24h: 1.4907,
				volumeQuote24: 84386.7953,
			},
		];

		store.dispatch(getAssetPairsSuccess(testAssetPairsUpdateData));
		const storeAfterRequest: IAssetPairsStore = store.getState().assetPairs;

		expect(storeAfterRequest.assetPairsLoader).toBeFalsy();
		expect(storeAfterRequest.assetPairs).toEqual(testAssetPairsUpdateData);
	});

	it('Get asset pairs fees and limits list request', () => {
		const state: IAssetPairsStore = store.getState().assetPairs;

		expect(state.assetPairsFeesAndLimitsLoader).toBeFalsy();

		store.dispatch(getAssetPairsFeesAndLimitsRequest());
		const afterState: IAssetPairsStore = store.getState().assetPairs;
		expect(afterState.assetPairsFeesAndLimitsLoader).toBeTruthy();
	});

	it('Get asset pairs fees and limits list success', () => {
		const testAssetPairsFeesAndLimitsSuccessData = [
			{
				id: 1,
				code: 'btc_usdt',
				maker_fee: 1,
				taker_fee: 5,
				amount_min: 0.01,
				amount_max: 0.001,
			},
		];

		store.dispatch(getAssetPairsFeesAndLimitsSuccess(testAssetPairsFeesAndLimitsSuccessData));
		const storeAfterRequest: IAssetPairsStore = store.getState().assetPairs;

		expect(storeAfterRequest.assetPairsFeesAndLimitsLoader).toBeFalsy();
		expect(storeAfterRequest.assetPairsFeesAndLimits).toEqual(
			testAssetPairsFeesAndLimitsSuccessData,
		);
	});
});
