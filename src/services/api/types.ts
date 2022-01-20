import { IAuthApi } from './auth/types';
import { IAssetPairsApi } from './assetPairs/types';
import { IAssetsApi } from './assets/types';
import { ISpotTradeApi } from './spotTrade/types';
import { ITradingChartApi } from './tradingChart/types';
import { ISettingsApi } from './settings/types';
import { IWalletsApi } from './wallets/types';
import { IOrdersApi } from './orders/types';
import { IWithdrawCryptoApi } from './withdrawCrypto/types';
import { IConvertApi } from './convert/types';
import { IKycApi } from './kyc/types';

// ==========================================:
export interface IApi {
	assetPairs: IAssetPairsApi;
	assets: IAssetsApi;
	auth: IAuthApi;
	settings: ISettingsApi;
	spotTrade: ISpotTradeApi;
	tradingChart: ITradingChartApi;
	wallets: IWalletsApi;
	orders: IOrdersApi;
	withdrawCrypto: IWithdrawCryptoApi;
	convert: IConvertApi;
	kyc: IKycApi;
}
