export interface ILoginForm {
	loginSubmit: (value: ILoginSubmitValue) => void;
}

export interface ILoginSubmitValue {
	email: string;
	password: string;
}
