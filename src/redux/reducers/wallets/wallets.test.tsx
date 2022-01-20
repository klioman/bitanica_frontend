import { store } from 'redux/store';
import { getWalletsRequest, getWalletsSuccess } from './reducer';
import { IWalletsStore } from './types';

// ================================================:
describe('Wallets reducer:', () => {
	it('Get wallets initial state', () => {
		const state: IWalletsStore = store.getState().wallets;

		expect(state.walletsLoader).toBeFalsy();
		expect(state.walletsList).toEqual(null);
	});

	it('Get wallets list request', () => {
		const state: IWalletsStore = store.getState().wallets;

		expect(state.walletsLoader).toBeFalsy();

		store.dispatch(getWalletsRequest());
		const afterState: IWalletsStore = store.getState().wallets;
		expect(afterState.walletsLoader).toBeTruthy();
	});

	it('Get wallets list success', () => {
		const testWalletsSuccessData = [
			{
				id: 11,
				asset: {
					id: 2,
					code: 'btc',
					type: 'crypto',
					exchangeable: 1,
					chain: 'test',
					decimals: null,
					name: 'Bitcoin Test',
					deposit_max: 999999999,
					deposit_min: 0.001,
					withdraw_max: 999999999,
					withdraw_min: 0.001,
					exchange_min: 0.001,
					img_path: 'https://7macw4ggmb.corp.merehead.xyz/storage/assets/btc.png',
				},
				balance: '0.00000000',
				frozen_balance: '0.00000000',
				total: '0.00000000',
				tag: null,
				has_withdrawal_tag: false,
				btc_value: '0.00000000',
				usd_value: '0.00',
				networks: [
					{
						network_id: 'default',
						network_name: 'btc',
						withdrawable: 1,
						depositable: 1,
						depositable_message: null,
						withdrawable_message: null,
						top_up_address: null,
						deposit_fee: 1,
						withdraw_fee: 10,
						withdraw_min: 0.0001,
						withdraw_max: 999999999,
					},
				],
			},
		];

		store.dispatch(getWalletsSuccess(testWalletsSuccessData));
		const storeAfterRequest: IWalletsStore = store.getState().wallets;

		expect(storeAfterRequest.walletsLoader).toBeFalsy();
		expect(storeAfterRequest.walletsList).toEqual(testWalletsSuccessData);
	});
});
