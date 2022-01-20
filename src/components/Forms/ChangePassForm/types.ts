// ==========================================:
export interface IChangePassForm {
	changePassFormSubmit: (values: IChangePassFormValue) => void;
}

export interface IChangePassFormValue {
	old_password: string;
	password: string;
	confirm_password: string;
}
