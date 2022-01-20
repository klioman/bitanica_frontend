import {
	IKycOndatoURLRequestPayload,
	IKycOndatoURLResponsePayload,
	IKycOndatoUserDataResponsePayload,
} from 'redux/reducers/kyc/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IKycApi } from './types';

// ==========================================:
export const kyc: IKycApi = {
	getKycOndatoUrl: (payload: IKycOndatoURLRequestPayload) =>
		http
			.post<IKycOndatoURLResponsePayload>(endpoint.kyc.START_KYC, payload)
			.then((response) => response.data),
	getKycOndatoUserData: () =>
		http
			.get<IKycOndatoUserDataResponsePayload>(endpoint.kyc.KYC_USER_DATA)
			.then((response) => response.data),
};
