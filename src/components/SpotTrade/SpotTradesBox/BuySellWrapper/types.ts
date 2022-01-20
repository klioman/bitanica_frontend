import { IWalletItem } from 'redux/reducers/wallets/types';

export interface IBuySellWrapperProps {
	orderType: string;
	mode: string;
}

export interface ISpotData {
	[key: string]: IWalletItem;
}

export interface ICurrentPairBalanceData {
	buy: ICurrentPairBalanceTypeData;
	sell: ICurrentPairBalanceTypeData;
}

export interface ICurrentPairBalanceTypeData {
	code: string;
	balance: number;
}
