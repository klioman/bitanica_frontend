import { RouterState as IRouterState } from 'connected-react-router';
import { IAppStore } from 'redux/reducers/app/types';
import { IAssetPairsStore } from 'redux/reducers/assetPairs/types';
import { IAssetsStore } from 'redux/reducers/assets/types';
import { IAuthStore } from 'redux/reducers/auth/types';
import { ISettingsStore } from 'redux/reducers/settings/types';
import { ISocketsStore } from 'redux/reducers/sockets/types';
import { ISpotTradeStore } from 'redux/reducers/spotTrade/types';
import { ITradingSettingsStore } from 'redux/reducers/tradingSettings/types';
import { IConvertStore } from './reducers/convert/types';
import { IKycStore } from './reducers/kyc/types';
import { IOrdersStore } from './reducers/orders/types';
import { IWalletsStore } from './reducers/wallets/types';
import { IWitdrawCryptoStore } from './reducers/withdrawCrypto/types';

// ==========================================:
export interface IStoreState {
	router: IRouterState;
	app: IAppStore;
	assetPairs: IAssetPairsStore;
	assets: IAssetsStore;
	auth: IAuthStore;
	settings: ISettingsStore;
	sockets: ISocketsStore;
	spotTrade: ISpotTradeStore;
	tradingSettings: ITradingSettingsStore;
	wallets: IWalletsStore;
	orders: IOrdersStore;
	withdrawCrypto: IWitdrawCryptoStore;
	convert: IConvertStore;
	kyc: IKycStore;
}
