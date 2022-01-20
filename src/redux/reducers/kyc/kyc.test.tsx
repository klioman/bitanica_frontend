import { store } from 'redux/store';
import {
	getKycOndatoURLRequest,
	getKycOndatoURLSuccess,
	getKycOndatoUserDataRequest,
	getKycOndatoUserDataSuccess,
	kycInitState,
} from './reducer';
import { IKycStore } from './types';

// ================================================:
describe('Kyc reducer:', () => {
	it('Get kyc initial state', () => {
		store.dispatch(kycInitState());

		const state: IKycStore = store.getState().kyc;

		expect(state.kycOndatoURLLoader).toBeFalsy();
		expect(state.kycOndatoURL).toEqual(null);
	});

	it('Get kyc ondato url request', () => {
		const state: IKycStore = store.getState().kyc;

		expect(state.kycOndatoURLLoader).toBeFalsy();

		const testKycOndatoUrlRequestData = {
			first_name: 'first',
			last_name: 'last',
			date_birth: '21.01.2001',
		};

		store.dispatch(getKycOndatoURLRequest(testKycOndatoUrlRequestData));

		const afterState: IKycStore = store.getState().kyc;
		expect(afterState.kycOndatoURLLoader).toBeTruthy();
	});

	it('Get kyc ondato url success', () => {
		const testKycOndatoUrlSuccessData = {
			url: 'https://kyc.ondato.test.com',
		};

		store.dispatch(getKycOndatoURLSuccess(testKycOndatoUrlSuccessData));
		const storeAfterRequest: IKycStore = store.getState().kyc;

		expect(storeAfterRequest.kycOndatoURLLoader).toBeFalsy();
		expect(storeAfterRequest.kycOndatoURL).toEqual(testKycOndatoUrlSuccessData);
	});

	it('Get kyc ondato user data request', () => {
		const state: IKycStore = store.getState().kyc;

		expect(state.kycOndatoUserDataLoader).toBeFalsy();

		store.dispatch(getKycOndatoUserDataRequest());

		const afterState: IKycStore = store.getState().kyc;
		expect(afterState.kycOndatoUserDataLoader).toBeTruthy();
	});

	it('Get kyc ondato user data success', () => {
		const testKycOndatoUserDataSuccessData = {
			id: 1,
			user_id: 5,
			status: 'pending',
			refund_id: '5a875185d5fe4c0295d9bd0ba6249333',
			url: 'https://sandbox-kyc.ondato.com/start/5a875185d5fe4c0295d9bd0ba6249333',
			msg: '',
			created_at: 1641900564,
			updated_at: 1642164606,
		};

		store.dispatch(getKycOndatoUserDataSuccess(testKycOndatoUserDataSuccessData));
		const storeAfterRequest: IKycStore = store.getState().kyc;

		expect(storeAfterRequest.kycOndatoUserDataLoader).toBeFalsy();
		expect(storeAfterRequest.kycOndatoUserData).toEqual(testKycOndatoUserDataSuccessData);
	});
});
