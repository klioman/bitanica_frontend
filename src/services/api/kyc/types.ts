import {
	IKycOndatoURLRequestPayload,
	IKycOndatoURLResponsePayload,
	IKycOndatoUserDataResponsePayload,
} from 'redux/reducers/kyc/types';

// ==========================================:
export interface IKycApi {
	getKycOndatoUrl: (payload: IKycOndatoURLRequestPayload) => Promise<IKycOndatoURLResponsePayload>;
	getKycOndatoUserData: () => Promise<IKycOndatoUserDataResponsePayload>;
}
