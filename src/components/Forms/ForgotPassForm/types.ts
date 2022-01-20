export interface IForgotPassSubmitValue {
	email: string;
}

export interface IForgotPasswordForm {
	emailSubmit: (values: IForgotPassSubmitValue) => void;
}
