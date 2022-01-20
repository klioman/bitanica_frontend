import { History } from 'history';

export interface IWitdrawCryptoStore {
	toWithdrawalAddresIsValid: boolean;
	checkWithdrawalAddressLoader: boolean;
	confirmWithdrawLoader: boolean;
}

// =============================================================:
export interface ICheckWithdrawalAddressRequestData {
	asset_code: string;
	address: string;
	network: string;
}

// =============================================================:
export interface ICheckWithdrawalAddressResponseData {
	is_valid: boolean;
}

// =============================================================:
export interface IConfyrmCryptoWithdrawalData {
	wallet_id: number;
	amount: number;
	address: string;
	network: string;
	email_code: string;
	totp?: string;
}
export interface IConfyrmCryptoWithdrawalPayloadData {
	data: IConfyrmCryptoWithdrawalData;
	history: History;
	closeModal: () => void;
	setIsConfirmDesabled: (val: boolean) => void;
}

// =============================================================:
export type ICheckWithdrawalAddressRequestPayload = ICheckWithdrawalAddressRequestData;
export type ICheckWithdrawalAddressResponsePayload = ICheckWithdrawalAddressResponseData;

// =============================================================:
export type IConfyrmCryptoWithdrawalRequestPayload = IConfyrmCryptoWithdrawalPayloadData;
