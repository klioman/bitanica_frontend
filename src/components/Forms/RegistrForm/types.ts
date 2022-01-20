export interface IRegistrForm {
	registrSubmit: (values: IRegistrValues) => void;
}

export interface IRegistrValues {
	email: string;
	password: string;
	confirmPassword: string;
	acceptTerms: boolean;
	cookiePolicy: boolean;
}
