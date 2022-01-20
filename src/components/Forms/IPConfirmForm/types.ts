export interface IIpConfirmForm {
	ipConfirmSubmit: (values: IIpConfirmSubmitValue) => void;
}

export interface IIpConfirmSubmitValue {
	code: string;
	email: string;
}
