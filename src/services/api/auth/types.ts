import { AxiosResponse } from 'axios';
import {
	IRegistrResponse,
	ILoginPayloadData,
	IRegistrationPayload,
	ILoginResponse,
	IForgotPasswordPayload,
	IForgotPasswordResponse,
	ILogoutResponse,
	ICreateNewPasswordFormData,
	IEmailConfirmPayload,
	IEmailResetConfirmTokenPayload,
	IipConfirmPayloadData,
} from 'redux/reducers/auth/types';

// ==========================================:
export interface IAuthApi {
	login: (payload: ILoginPayloadData) => Promise<ILoginResponse>;
	registration: (payload: IRegistrationPayload) => Promise<IRegistrResponse>;
	newPassword: (payload: ICreateNewPasswordFormData) => Promise<IRegistrResponse>;
	emailConfirm: (payload: IEmailConfirmPayload) => Promise<AxiosResponse>;
	ipConfirm: (payload: IipConfirmPayloadData) => Promise<AxiosResponse>;
	emailResetConfirmToken: (payload: IEmailResetConfirmTokenPayload) => Promise<AxiosResponse>;
	forgotPassword: (payload: IForgotPasswordPayload) => Promise<IForgotPasswordResponse>;
	logout: () => Promise<ILogoutResponse>;
}
