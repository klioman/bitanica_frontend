import { store } from 'redux/store';
import { getAssetsRequest, getAssetsSuccess } from './reducer';
import { IAssetsStore } from './types';

// ================================================:
describe('Assets reducer:', () => {
	it('Get assets initial state', () => {
		const state: IAssetsStore = store.getState().assets;

		expect(state.assetsLoader).toBeFalsy();
		expect(state.assetsList).toEqual(null);
	});

	it('Get assets list request', () => {
		const state: IAssetsStore = store.getState().assets;

		expect(state.assetsLoader).toBeFalsy();

		store.dispatch(getAssetsRequest());
		const afterState: IAssetsStore = store.getState().assets;
		expect(afterState.assetsLoader).toBeTruthy();
	});

	it('Get assets list success', () => {
		const testAssetsSuccessData = [
			{
				chain: 'test',
				code: 'btc',
				decimals: null,
				deposit_max: 999999999,
				deposit_min: 0.001,
				depositable: 1,
				depositable_message: null,
				exchange_min: 0.001,
				exchangeable: 1,
				id: 2,
				img_path: '/storage/assets/btc.png',
				name: 'Bitcoin Test',
				type: 'crypto',
				withdraw_max: 999999999,
				withdraw_min: 0.001,
				withdrawable: 1,
				withdrawable_message: null,
			},
		];

		store.dispatch(getAssetsSuccess(testAssetsSuccessData));
		const storeAfterRequest: IAssetsStore = store.getState().assets;

		expect(storeAfterRequest.assetsLoader).toBeFalsy();
		expect(storeAfterRequest.assetsList).toEqual(testAssetsSuccessData);
	});
});
