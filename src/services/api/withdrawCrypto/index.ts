import {
	ICheckWithdrawalAddressRequestData,
	ICheckWithdrawalAddressResponsePayload,
	IConfyrmCryptoWithdrawalData,
} from 'redux/reducers/withdrawCrypto/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IWithdrawCryptoApi } from './types';

// ==========================================:
export const withdrawCrypto: IWithdrawCryptoApi = {
	checkWithdrawalAddress: (payload: ICheckWithdrawalAddressRequestData) =>
		http
			.post<ICheckWithdrawalAddressResponsePayload>(
				endpoint.withdrawCrypto.CHECK_WITHDRAWAL_ADDRESS,
				payload,
			)
			.then((response) => response.data),
	sendWithdrawalEmailCode: () =>
		http.get(endpoint.withdrawCrypto.SEND_WITHDRAWAL_EMAIL_CODE).then((response) => response.data),
	confirmCryptoWithdrawal: (payload: IConfyrmCryptoWithdrawalData) =>
		http
			.post(endpoint.withdrawCrypto.CONFIRM_CRYPTO_WITHDRAWAL, payload)
			.then((response) => response.data),
};
