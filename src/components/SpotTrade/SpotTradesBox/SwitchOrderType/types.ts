import { ICurrentPairBalanceData } from '../BuySellWrapper/types';

export interface ISwitchOrderTypeProps {
	orderType: string;
	mode: string;
	asset: ICurrentPairBalanceData;
}
