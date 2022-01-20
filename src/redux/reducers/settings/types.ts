export interface ISettingsStore {
	userSettingsData: null | IUserSettings;
	data2fa: null | IGenerate2faKeyResponse;
	check2faEnables: null | string;
	userSettingsDataLoader: boolean;
	changePassLoader: boolean;
	account2faLoader: boolean;
	displayDisable2faForm: boolean;
	check2faEnablesLoader: boolean;
}

export interface IChangePassPayload {
	old_password: string;
	password: string;
	confirm_password: string;
}

export interface IGenerate2faKeyResponse {
	QR_Image: string;
	secret: string;
	reauthenticating: boolean;
}

export interface IEnable2faPayload {
	totp: string;
}

export interface IDisable2faPayload {
	totp: string;
}
export interface ICheck2faEnables {
	status: string;
}

export interface IUserSettings {
	user: IUserSettingsData;
	token_expired_at: number;
}

export interface IUserSettingsData {
	id: number;
	email: string;
	email_confirmed: number;
	google2fa_enabled: number;
	type_id: number;
	status_id: number;
	kyc_message: null | string;
	last_login: number;
	blocked: string;
	is_active: number;
	last_activity: number;
	invite_key: string;
	created_at: number;
	username: string;
	invite_url: string;
	data: {
		first_name: null | string;
		last_name: null | string;
		city: null | string;
		country: null | string;
		post_code: null | string;
		phone: null | string;
	};
	status: {
		id: number;
		name: string;
	};
	token_expired_at: number;
}
