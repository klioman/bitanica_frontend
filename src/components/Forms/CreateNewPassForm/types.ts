import { History } from 'history';

// ==========================================:
export interface ICreateNewPassSubmitValue {
	password: string;
	confirmPassword: string;
}

export interface ICreateNewPasswordForm {
	createNewPassSubmit: (values: ICreateNewPasswordFormData) => void;
}

export interface ICreateNewPasswordFormData {
	data: ICreateNewPasswordFormDataTypes;
	history: History;
}

export interface ICreateNewPasswordFormDataTypes {
	password: string;
	token: string | null;
}
