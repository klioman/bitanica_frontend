/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import LimitOrder from '../LimitOrder';
import MarketOrder from '../MarketOrder';
import StopLimitOrder from '../StopLimitOrder';
import { ISwitchOrderTypeProps } from './types';

// ================================================:
const SwitchOrderType: FC<ISwitchOrderTypeProps> = ({ orderType, mode, asset }) => {
	const balance = mode === 'Buy' ? asset?.buy?.balance : asset?.sell?.balance;

	switch (orderType) {
		case 'limit_order':
			return (
				<LimitOrder
					assetToTradeCode={asset?.sell?.code}
					assetBalanceCode={asset?.buy?.code}
					balance={balance}
					mode={mode}
				/>
			);
		case 'market_order':
			return (
				<MarketOrder
					assetToTradeCode={asset?.sell?.code}
					assetBalanceCode={asset?.buy?.code}
					balance={balance}
					mode={mode}
				/>
			);
		case 'stop_limit_order':
			return (
				<StopLimitOrder
					assetToTradeCode={asset?.sell?.code}
					assetBalanceCode={asset?.buy?.code}
					balance={balance}
					mode={mode}
				/>
			);

		default:
			return (
				<LimitOrder
					assetToTradeCode={asset?.sell?.code}
					assetBalanceCode={asset?.buy?.code}
					balance={balance}
					mode={mode}
				/>
			);
	}
};

export default SwitchOrderType;
