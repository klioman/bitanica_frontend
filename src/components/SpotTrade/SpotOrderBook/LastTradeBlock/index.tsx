import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useDecimals from 'hooks/useDecimals';
import { getAssetPairsList } from 'redux/reducers/assetPairs/selectors';
import { getSpotRecentTrades } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';

const LastTradeBlock: FC = () => {
	const currentPair = useSelector(getCurrentPair);
	const assetPairsList = useSelector(getAssetPairsList);
	const recentTrades = useSelector(getSpotRecentTrades);

	const [priceDecimal] = useDecimals();

	const currentAssetPairData = useMemo(() => {
		return assetPairsList?.length ? assetPairsList.find((el) => el.code === currentPair) : null;
	}, [assetPairsList, currentPair]);

	const firstRecentTradeItem = recentTrades?.length && recentTrades[0]?.price;
	const secondRecentTradesItem = recentTrades?.length && recentTrades[1]?.price;

	const lastRecentTradeIsLow = Number(firstRecentTradeItem) < Number(secondRecentTradesItem);

	const getMarketValueColorClass = (value: boolean): string => {
		switch (value) {
			case true:
				return 'market-value market-value--low';

			case false:
				return 'market-value';

			default:
				return 'market-value';
		}
	};

	return (
		<div className={getMarketValueColorClass(lastRecentTradeIsLow)}>
			<span className="market-value__text market-value__text--low">
				{fixedCropNumber(Number(firstRecentTradeItem), priceDecimal) || firstRecentTradeItem}
			</span>
			<span className="market-value__arrow icon-arrow3" />

			<span className="market-value__num-text">
				{(currentAssetPairData &&
					fixedCropNumber(Number(currentAssetPairData?.last_price), priceDecimal)) ||
					currentAssetPairData?.last_price}
			</span>
		</div>
	);
};

export default LastTradeBlock;
