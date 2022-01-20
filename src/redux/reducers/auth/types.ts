import { History } from 'history';

export interface IAuthStore {
	accessToken: string | null;
	socketToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	registrLoader: boolean;
	loginLoader: boolean;
	logoutLoader: boolean;
	forgotPasswordLoader: boolean;
	createNewPasswordLoader: boolean;
	ipConfirmLoader: boolean;
	emailConfirm: boolean;
	emailConfirmLoader: boolean;
	emailResetConfirmTokenLoader: boolean;
	emailResetConfirmTokenMessage: boolean;
}

// ==========================================:
export interface ILoginPayload {
	data: ILoginPayloadData;
	history: History;
}

export interface ILoginPayloadData {
	email: string;
	password: string;
	captcha: string;
}

export interface ILoginResponse {
	token: string;
	socket_token: string;
	user_data: ILoginResponseUser;
	token_expired_at: number;
}

export interface ILoginResponseUser {
	id: number;
	email: string;
	email_confirmed: number;
	google2fa_enabled: number;
	type_id: number;
	status_id: number;
	kyc_message: null | string;
	last_login: number;
	blocked: string;
	is_active: boolean;
	last_activity: string;
	invite_key: string;
	created_at: number;
	username: string;
	invite_url: string;
	data: ILoginResponseUserData;
	status: ILoginResponseUserStatus;
}

export interface ILoginResponseUserData {
	user_id: number;
	first_name: null | string;
	last_name: null | string;
	phone: null | string;
	dob: null | string;
	country: null | string;
	state: null | string;
	city: null | string;
	street: null | string;
	post_code: null | number;
	created_at: string;
	updated_at: string;
}

export interface ILoginResponseUserStatus {
	id: number;
	name: string;
}

// ==========================================:
export interface IRegistrationPayload {
	acceptTerms: boolean;
	captcha: string;
	confirmPassword: string;
	cookiePolicy: boolean;
	email: string;
	password: string;
}

export interface IRegistrResponse {
	status: string;
	email_confirm_token: string;
	user: IRegistrResponseUser;
}

export interface IRegistrResponseUser {
	id: string;
	email: string;
	invite_key: string;
	created_at: number;
	invite_url: string;
}

// ==========================================:

export interface IipConfirmPayload {
	data: IipConfirmPayloadData;
	history: History;
}

export interface IipConfirmPayloadData {
	code: string;
	email: string;
}

// ==========================================:
export interface ILogoutPayload {
	history: History;
}

export interface ILogoutResponse {
	status: string;
}

// ==========================================:
export interface IEmailConfirmPayload {
	token: string | string[] | null;
	timestamp: string | string[] | null;
}

// ==========================================:
export interface IEmailResetConfirmTokenPayload {
	token: string | string[] | null;
	history: History;
}

// ==========================================:
export interface IForgotPasswordPayload {
	email: string;
}

export interface IForgotPasswordResponse {
	status: string;
	password_reset_token: string;
}

// ==========================================:
export interface ICreateNewPasswordPayload {
	data: ICreateNewPasswordFormData;
	history: History;
}

export interface ICreateNewPasswordFormData {
	password: string;
	token: string | null;
}
