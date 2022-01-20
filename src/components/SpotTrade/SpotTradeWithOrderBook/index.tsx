import Chart from 'components/Chart';
import SpotHistoryTables from '../SpotHistoryTables';
import SpotMarketHeader from '../SpotMarketHeader';
import SpotOrderBook from '../SpotOrderBook';
import SpotTradesBox from '../SpotTradesBox';

const SpotTradeWithOrderBook = () => {
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
					</div>
					<SpotTradesBox />
				</div>

				<SpotHistoryTables />
			</div>
		</div>
	);
};

export default SpotTradeWithOrderBook;
