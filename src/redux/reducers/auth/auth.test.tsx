import { store } from 'redux/store';
import { history } from 'routes/history';
import {
	testEmail,
	testLoginData,
	testPassword,
	testRegistrData,
	testRequestLoginData,
} from 'services/constants/testLoginCredentials';
import {
	authInitState,
	createNewPasswordRequest,
	createNewPasswordSuccess,
	forgotPasswordRequest,
	forgotPasswordSuccess,
	loginRequest,
	loginSuccess,
	logoutRequest,
	registrationRequest,
	registrationSuccess,
} from './reducer';
import { IAuthStore } from './types';

// ================================================:
describe('Auth reducer:', () => {
	it('User auth login', () => {
		const state: IAuthStore = store.getState().auth;

		expect(state.loginLoader).toBeFalsy();

		store.dispatch(loginRequest({ data: testLoginData, history }));
		const afterState: IAuthStore = store.getState().auth;
		expect(afterState.loginLoader).toBeTruthy();

		// ---------------------------------------------:
		store.dispatch(loginSuccess(testRequestLoginData));
		const storeAfterRequest: IAuthStore = store.getState().auth;

		expect(storeAfterRequest.isAuthenticated).toBeTruthy();
		expect(storeAfterRequest.loginLoader).toBeFalsy();
		expect(storeAfterRequest.accessToken).toBeTruthy();
	});

	it('User auth registration', () => {
		const state: IAuthStore = store.getState().auth;

		expect(state.registrLoader).toBeFalsy();

		store.dispatch(registrationRequest(testRegistrData));
		const afterState: IAuthStore = store.getState().auth;
		expect(afterState.registrLoader).toBeTruthy();

		// ---------------------------------------------:
		store.dispatch(registrationSuccess());
		const storeAfterRequest: IAuthStore = store.getState().auth;

		expect(storeAfterRequest.registrLoader).toBeFalsy();
	});

	it('Forgot password', () => {
		const state: IAuthStore = store.getState().auth;

		expect(state.forgotPasswordLoader).toBeFalsy();

		store.dispatch(
			forgotPasswordRequest({
				email: testEmail,
			}),
		);

		const afterState: IAuthStore = store.getState().auth;
		expect(afterState.forgotPasswordLoader).toBeTruthy();
		// ---------------------------------------------:

		store.dispatch(forgotPasswordSuccess());
		const storeAfterRequest: IAuthStore = store.getState().auth;
		expect(storeAfterRequest.forgotPasswordLoader).toBeFalsy();
	});

	it('User logout', () => {
		const state: IAuthStore = store.getState().auth;

		expect(state.logoutLoader).toBeFalsy();

		store.dispatch(logoutRequest({ history }));

		const afterState: IAuthStore = store.getState().auth;
		expect(afterState.logoutLoader).toBeTruthy();

		// ---------------------------------------------:
		store.dispatch(authInitState());
		const afterRequestState: IAuthStore = store.getState().auth;
		expect(afterRequestState.logoutLoader).toBeFalsy();
	});

	it('Create new password request', () => {
		const state: IAuthStore = store.getState().auth;

		expect(state.createNewPasswordLoader).toBeFalsy();

		store.dispatch(
			createNewPasswordRequest({
				data: { password: testPassword, token: '03AGdBq25s1k26ma9GPe5Iwi90Vvac9g39kFe71P7' },
				history,
			}),
		);

		const afterState: IAuthStore = store.getState().auth;
		expect(afterState.createNewPasswordLoader).toBeTruthy();
		// ---------------------------------------------:

		store.dispatch(createNewPasswordSuccess());
		const storeAfterRequest: IAuthStore = store.getState().auth;
		expect(storeAfterRequest.createNewPasswordLoader).toBeFalsy();
	});
});
