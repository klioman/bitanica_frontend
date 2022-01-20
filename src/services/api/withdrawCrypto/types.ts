import { AxiosPromise } from 'axios';
import {
	ICheckWithdrawalAddressRequestData,
	ICheckWithdrawalAddressResponsePayload,
	IConfyrmCryptoWithdrawalData,
} from 'redux/reducers/withdrawCrypto/types';

// ==========================================:
export interface IWithdrawCryptoApi {
	checkWithdrawalAddress: (
		payload: ICheckWithdrawalAddressRequestData,
	) => Promise<ICheckWithdrawalAddressResponsePayload>;
	sendWithdrawalEmailCode: () => AxiosPromise;
	confirmCryptoWithdrawal: (payload: IConfyrmCryptoWithdrawalData) => AxiosPromise;
}
