import {
	IGenerateAddressWalletPayload,
	IGenerateAddressWalletData,
	IWalletsResponsePayload,
	IWalletsCryptoHistoryRequestPayload,
	IWalletsCryptoHistoryResponsePayload,
} from 'redux/reducers/wallets/types';

// ==========================================:
export interface IWalletsApi {
	getWallets: () => Promise<IWalletsResponsePayload>;
	generateAddress: (payload: IGenerateAddressWalletPayload) => Promise<IGenerateAddressWalletData>;
	getWalletsCryptoHistory: (
		payload: IWalletsCryptoHistoryRequestPayload,
	) => Promise<IWalletsCryptoHistoryResponsePayload>;
}
