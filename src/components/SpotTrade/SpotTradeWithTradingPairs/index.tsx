import Chart from 'components/Chart';
import SpotHistoryTables from '../SpotHistoryTables';
import SpotMarketHeader from '../SpotMarketHeader';
import SpotPairs from '../SpotPairs';
import SpotRecentTrades from '../SpotRecentTrades';
import SpotTradesBox from '../SpotTradesBox';

const SpotTradeWithTradingPairs = () => {
	return (
		<div className="content-inner">
			<div className="market">
				<div className="market-block">
					<SpotMarketHeader />
				</div>
				<div className="market-content">
					<div className="market-block market-block--small">
						<SpotPairs />
						<SpotRecentTrades />
					</div>
					<div className="market-main">
						<div className="market-block">
							<div className="market-chart">
								<Chart />
							</div>
						</div>
					</div>
					<SpotTradesBox />
				</div>

				<SpotHistoryTables />
			</div>
		</div>
	);
};

export default SpotTradeWithTradingPairs;
