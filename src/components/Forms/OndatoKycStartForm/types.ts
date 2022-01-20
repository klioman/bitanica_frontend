import { IIKycOndatoURLRequestData } from 'redux/reducers/kyc/types';

export interface IOndatoKycStartForm {
	startOndatoKycSubmit: (value: IIKycOndatoURLRequestData) => void;
}

export interface IOndatoKycStartFormValue {
	firstName: string;
	lastName: string;
	dateOfBirth: number;
	monthOfBirth: number;
	yearOfBirth: number;
}
