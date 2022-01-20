import { IApi } from './types';
import { assetPairs } from './assetPairs';
import { assets } from './assets';
import { auth } from './auth';
import { settings } from './settings';
import { spotTrade } from './spotTrade';
import { tradingChart } from './tradingChart';
import { wallets } from './wallets';
import { orders } from './orders';
import { withdrawCrypto } from './withdrawCrypto';
import { convert } from './convert';
import { kyc } from './kyc';

const api: IApi = {
	assetPairs,
	assets,
	auth,
	settings,
	spotTrade,
	tradingChart,
	wallets,
	orders,
	withdrawCrypto,
	convert,
	kyc,
};

export { api };
