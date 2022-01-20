/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export interface IKycStore {
	kycOndatoURL: null | IKycOndatoUrlData;
	kycOndatoURLLoader: boolean;
	kycOndatoUserData: null | IKycOndatoUserData;
	kycOndatoUserDataLoader: boolean;
}

// =============================================================:
export interface IKycOndatoUrlData {
	url: string;
}

// =============================================================:
export interface IKycOndatoUserData {
	id: number;
	user_id: number;
	status: string;
	refund_id: string;
	url: string;
	msg: string;
	created_at: number;
	updated_at: number;
}

// =============================================================:
export interface IIKycOndatoURLRequestData {
	first_name: string;
	middle_name?: string;
	last_name: string;
	date_birth: string;
	setIosLink?: Dispatch<SetStateAction<{ url: string; params: any }>>;
}

// =============================================================:
export type IKycOndatoURLRequestPayload = IIKycOndatoURLRequestData;
export type IKycOndatoURLResponsePayload = IKycOndatoUrlData;

// =============================================================:
export type IKycOndatoUserDataResponsePayload = IKycOndatoUserData | null;
