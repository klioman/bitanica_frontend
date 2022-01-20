import Chart from 'components/Chart';
import SpotHistoryTables from '../SpotHistoryTables';
import SpotMarketHeader from '../SpotMarketHeader';
import SpotOrderBook from '../SpotOrderBook';
import SpotPairs from '../SpotPairs';
import SpotRecentTrades from '../SpotRecentTrades';
import SpotTradesBox from '../SpotTradesBox';

// ================================================:
const SpotTradeWithOrderBookAndTradingPairs = () => {
	return (
		<div className="content-inner">
			<div className="market">
				<div className="market-block">
					<SpotMarketHeader />
				</div>
				<div className="market-content">
					<div className="market-block market-block--small">
						<SpotOrderBook />
					</div>
					<div className="market-main">
						<div className="market-block">
							<div className="market-chart">
								<Chart />
							</div>
						</div>
						<SpotTradesBox />
					</div>
					<div className="market-block">
						<SpotPairs />
						<SpotRecentTrades />
					</div>
				</div>

				<SpotHistoryTables />
			</div>
		</div>
	);
};

export default SpotTradeWithOrderBookAndTradingPairs;
