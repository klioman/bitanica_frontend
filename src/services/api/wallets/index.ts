import {
	IGenerateAddressWalletPayload,
	IGenerateAddressWalletData,
	IWalletsResponsePayload,
	IWalletsCryptoHistoryResponsePayload,
} from 'redux/reducers/wallets/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IWalletsApi } from './types';

// ==========================================:
export const wallets: IWalletsApi = {
	getWallets: () =>
		http.get<IWalletsResponsePayload>(endpoint.wallets.WALLETS).then((response) => response.data),

	generateAddress: (payload) =>
		http
			.post<IGenerateAddressWalletPayload, { data: IGenerateAddressWalletData }>(
				endpoint.wallets.GENERATE_ADDRESS(payload.id),
				{
					network: payload.network,
				},
			)
			.then((response) => response.data),

	getWalletsCryptoHistory: (payload) =>
		http
			.get<IWalletsCryptoHistoryResponsePayload>(endpoint.wallets.CRYPTO_HISTORY, payload)
			.then((response) => response.data),
};
