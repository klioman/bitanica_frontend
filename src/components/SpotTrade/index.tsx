import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getWorkspaceSettings } from 'redux/reducers/tradingSettings/selectors';
import SpotTradeWithOrderBook from './SpotTradeWithOrderBook';
import SpotTradeWithTradingPairs from './SpotTradeWithTradingPairs';
import SpotTradeWithOrderBookAndTradingPairs from './SpotTradeWithOrderBookAndTradingPairs';
import SpotTradeWithoutOrderBookAndTradingPairs from './SpotTradeWithoutOrderBookAndTradingPairs';

const SpotTrade: FC = () => {
	const workspaceSettings = useSelector(getWorkspaceSettings);

	const spotTradeWithOrderBook =
		workspaceSettings?.orderBookSection && !workspaceSettings?.tradingPairsSection;

	const spotTradeWithTradingPairs =
		workspaceSettings?.tradingPairsSection && !workspaceSettings?.orderBookSection;

	const spotTradeWithOrderBookAndTradingPairs =
		workspaceSettings?.tradingPairsSection && workspaceSettings?.orderBookSection;

	const spotTradeWithoutOrderBookAndTradingPairs =
		!workspaceSettings?.tradingPairsSection && !workspaceSettings?.orderBookSection;
	workspaceSettings;
	return (
		<>
			{spotTradeWithOrderBook && <SpotTradeWithOrderBook />}
			{spotTradeWithTradingPairs && <SpotTradeWithTradingPairs />}
			{spotTradeWithOrderBookAndTradingPairs && <SpotTradeWithOrderBookAndTradingPairs />}
			{spotTradeWithoutOrderBookAndTradingPairs && <SpotTradeWithoutOrderBookAndTradingPairs />}
		</>
	);
};

export default SpotTrade;
