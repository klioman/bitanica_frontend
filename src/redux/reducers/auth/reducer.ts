/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IAuthStore,
	ICreateNewPasswordPayload,
	IEmailConfirmPayload,
	IEmailResetConfirmTokenPayload,
	IForgotPasswordPayload,
	IipConfirmPayload,
	ILoginPayload,
	ILoginResponse,
	ILogoutPayload,
	IRegistrationPayload,
} from './types';

// ================================================:
export const initialState: IAuthStore = {
	accessToken: null,
	socketToken: null,
	refreshToken: null,
	isAuthenticated: false,
	registrLoader: false,
	logoutLoader: false,
	loginLoader: false,
	forgotPasswordLoader: false,
	createNewPasswordLoader: false,
	ipConfirmLoader: false,
	emailConfirm: false,
	emailConfirmLoader: false,
	emailResetConfirmTokenLoader: false,
	emailResetConfirmTokenMessage: false,
};

// ================================================:
const auth = createSlice({
	name: '@@auth',
	initialState,
	reducers: {
		loginRequest: (state, action: PayloadAction<ILoginPayload>) => {
			const loginRequestState = state;

			loginRequestState.loginLoader = true;
		},
		loginSuccess: (state, action: PayloadAction<ILoginResponse>) => {
			const { payload } = action;
			const loginState = state;

			loginState.isAuthenticated = true;
			loginState.loginLoader = false;
			loginState.accessToken = payload.token;
			loginState.socketToken = payload.socket_token;
		},

		registrationRequest: (state, action: PayloadAction<IRegistrationPayload>) => {
			const registrationState = state;

			registrationState.registrLoader = true;
		},
		registrationSuccess: (state) => {
			const registrationState = state;

			registrationState.registrLoader = false;
		},

		forgotPasswordRequest: (state, action: PayloadAction<IForgotPasswordPayload>) => {
			const forgotPasswordState = state;
			forgotPasswordState.forgotPasswordLoader = true;
		},
		forgotPasswordSuccess: (state) => {
			const forgotPasswordState = state;
			forgotPasswordState.forgotPasswordLoader = false;
		},

		emailConfirmStatusRequest: (state) => {
			const emailConfirmState = state;
			emailConfirmState.emailConfirm = true;
		},
		emailConfirmStatusCallback: (state) => {
			const emailConfirmState = state;
			emailConfirmState.emailConfirm = false;
			emailConfirmState.emailResetConfirmTokenMessage = false;
		},

		emailConfirmRequest: (state, action: PayloadAction<IEmailConfirmPayload>) => {
			const emailConfirmState = state;
			emailConfirmState.emailConfirmLoader = true;
		},
		emailConfirmSuccess: (state) => {
			const emailConfirmState = state;
			emailConfirmState.emailConfirmLoader = false;
		},

		emailResetConfirmTokenRequest: (
			state,
			action: PayloadAction<IEmailResetConfirmTokenPayload>,
		) => {
			const emailResetConfirmTokenState = state;
			emailResetConfirmTokenState.emailResetConfirmTokenLoader = true;
		},
		emailResetConfirmTokenSuccess: (state) => {
			const emailResetConfirmTokenState = state;
			emailResetConfirmTokenState.emailResetConfirmTokenLoader = false;
		},

		createNewPasswordRequest: (state, action: PayloadAction<ICreateNewPasswordPayload>) => {
			const createNewPasswordState = state;

			createNewPasswordState.createNewPasswordLoader = true;
		},
		createNewPasswordSuccess: (state) => {
			const createNewPasswordState = state;

			createNewPasswordState.createNewPasswordLoader = false;
		},

		ipConfirmRequest: (state, action: PayloadAction<IipConfirmPayload>) => {
			const ipConfirmState = state;

			ipConfirmState.ipConfirmLoader = true;
		},
		ipConfirmSuccess: (state) => {
			const ipConfirmState = state;
			ipConfirmState.ipConfirmLoader = false;
		},

		logoutRequest: (state, action: PayloadAction<ILogoutPayload>) => {
			const logoutState = state;

			logoutState.logoutLoader = true;
		},

		authInitState: () => initialState,
	},
});

export default auth.reducer;
export const {
	ipConfirmRequest,
	ipConfirmSuccess,
	loginRequest,
	loginSuccess,
	registrationRequest,
	registrationSuccess,
	authInitState,
	forgotPasswordRequest,
	forgotPasswordSuccess,
	createNewPasswordRequest,
	createNewPasswordSuccess,
	emailConfirmRequest,
	emailConfirmSuccess,
	emailResetConfirmTokenRequest,
	emailResetConfirmTokenSuccess,
	emailConfirmStatusRequest,
	emailConfirmStatusCallback,
	logoutRequest,
} = auth.actions;
