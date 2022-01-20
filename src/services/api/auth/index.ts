import {
	ICreateNewPasswordFormData,
	IEmailConfirmPayload,
	IEmailResetConfirmTokenPayload,
	IForgotPasswordPayload,
	IForgotPasswordResponse,
	IipConfirmPayloadData,
	ILoginPayload,
	ILoginResponse,
	IRegistrationPayload,
	IRegistrResponse,
} from 'redux/reducers/auth/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IAuthApi } from './types';

// ==========================================:
export const auth: IAuthApi = {
	login: (payload) =>
		http
			.post<ILoginPayload, { data: ILoginResponse }>(endpoint.auth.LOGIN, payload)
			.then((response) => response.data),

	registration: (payload) =>
		http
			.post<IRegistrationPayload, { data: IRegistrResponse }>(endpoint.auth.REGISTRATION, payload)
			.then((response) => response.data),

	forgotPassword: (payload) =>
		http
			.post<IForgotPasswordPayload, { data: IForgotPasswordResponse }>(
				endpoint.auth.RESET_PASSWORD,
				payload,
			)
			.then((response) => response.data),

	emailConfirm: (payload) => http.put<IEmailConfirmPayload>(endpoint.auth.EMAIL_CONFIRM, payload),

	emailResetConfirmToken: (payload) =>
		http.post<IEmailResetConfirmTokenPayload>(endpoint.auth.RESET_EMAIL_CONFIRM, {
			token: payload.token,
		}),

	ipConfirm: (payload) => http.put<IipConfirmPayloadData>(endpoint.auth.IP_CONFIRM, payload),

	newPassword: (payload) =>
		http
			.put<ICreateNewPasswordFormData, { data: IRegistrResponse }>(
				endpoint.auth.NEW_PASSWORD,
				payload,
			)
			.then((response) => response.data),

	logout: () => http.post(endpoint.auth.LOGOUT),
};
