export interface IGoogle2faForm {
	google2faSubmit: (value: IGoogle2faFormData) => void;
	btnText: string;
}

export interface IGoogle2faFormData {
	totp: string;
}
