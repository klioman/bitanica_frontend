import { store } from 'redux/store';
import {
	checkWithdrawalAddressRequest,
	checkWithdrawalAddressSuccess,
	withdrawCryptoInitState,
} from './reducer';
import {
	ICheckWithdrawalAddressRequestData,
	ICheckWithdrawalAddressResponseData,
	IWitdrawCryptoStore,
} from './types';

// ================================================:
describe('Withdraw crypto reducer:', () => {
	it('Get withdraw crypto initial state', () => {
		store.dispatch(withdrawCryptoInitState());

		const afterState: IWitdrawCryptoStore = store.getState().withdrawCrypto;

		expect(afterState.checkWithdrawalAddressLoader).toBeFalsy();
		expect(afterState.toWithdrawalAddresIsValid).toBeTruthy();
	});

	it('Check withdrawal address request', () => {
		const state: IWitdrawCryptoStore = store.getState().withdrawCrypto;

		expect(state.checkWithdrawalAddressLoader).toBeFalsy();

		const testCheckWithdrawalAddressRequestData: ICheckWithdrawalAddressRequestData = {
			asset_code: 'bnb',
			address: '0x266E16Ae64C9baC3A175235500Cc2cb1FF61d460',
			network: 'bsc',
		};

		store.dispatch(checkWithdrawalAddressRequest(testCheckWithdrawalAddressRequestData));

		const afterState: IWitdrawCryptoStore = store.getState().withdrawCrypto;

		expect(afterState.checkWithdrawalAddressLoader).toBeTruthy();
	});

	it('Check withdrawal address success', () => {
		const testCheckWithdrawalAddressSuccessData: ICheckWithdrawalAddressResponseData = {
			is_valid: true,
		};

		store.dispatch(checkWithdrawalAddressSuccess(testCheckWithdrawalAddressSuccessData));
		const storeAfterRequest: IWitdrawCryptoStore = store.getState().withdrawCrypto;

		expect(storeAfterRequest.checkWithdrawalAddressLoader).toBeFalsy();
		expect(storeAfterRequest.toWithdrawalAddresIsValid).toBe(
			testCheckWithdrawalAddressSuccessData.is_valid,
		);
	});
});
