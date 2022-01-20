import { FC, MouseEvent, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import SocketWithTopicConnectWrapper from 'components/SocketWithTopicConnectWrapper';
import { getSpotOrderBook } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair, getWorkspaceSettings } from 'redux/reducers/tradingSettings/selectors';
import { filteredOrderbookDataByTab } from 'services/utils/orderBookTradingDataHelepers';
import { getFirstPartPairCode, getLastPartPairCode } from 'services/utils/tradingPairHelpers';
import LastTradeBlock from './LastTradeBlock';
import LayoutBar from './LayoutBar';
import OrderBookTable from './OrderBookTable';

// ================================================:
const SpotOrderBook: FC = () => {
	const workspaceSettings = useSelector(getWorkspaceSettings);
	const orderBookList = useSelector(getSpotOrderBook);
	const currentPair = useSelector(getCurrentPair);
	const [currentLayoutTab, setCurrentLayoutTab] = useState('general');

	const handleCurrentLayoutTab = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setCurrentLayoutTab(name);
	};

	const filteredOrderbookAskDataByLayoutTab = useMemo(
		() => filteredOrderbookDataByTab(orderBookList?.ask, currentLayoutTab, 'ask'),
		[orderBookList?.ask, currentLayoutTab],
	);

	const filteredOrderbookBidDataByLayoutTab = useMemo(
		() => filteredOrderbookDataByTab(orderBookList?.bid, currentLayoutTab, 'bid'),
		[orderBookList?.bid, currentLayoutTab],
	);

	const getTableClasses = (
		orderBookSection: boolean,
		tradingPairsSection: boolean,
		layout: string,
	): string => {
		switch (true) {
			case orderBookSection && tradingPairsSection:
				return 'table table--stats orderbook__table orderbook__table--small';
			case layout === 'ask' || layout === 'bid':
				return 'table table--stats orderbook__table orderbook__table--full-height spot-orderbook__table';

			default:
				return 'table table--stats orderbook__table';
		}
	};

	return (
		<SocketWithTopicConnectWrapper topicName={`order_book:${String(currentPair)}`}>
			<div className="orderbook">
				<div className="orderbook__header">
					<LayoutBar
						currentLayoutTab={currentLayoutTab}
						handleChangeLayoutBar={handleCurrentLayoutTab}
					/>
				</div>
				<div
					className={getTableClasses(
						workspaceSettings?.orderBookSection,
						!workspaceSettings?.tradingPairsSection,
						currentLayoutTab,
					)}
				>
					<div className="table-header">
						<div className="tr">
							<div className="td">
								<span className="table-header__name">
									{String(L.translate('Trade.Spot.SpotOrderBook.OrderBookColumnTitles.price_name'))}
									({getLastPartPairCode(currentPair || '')})
								</span>
							</div>
							<div className="td">
								<span className="table-header__name">
									{String(
										L.translate('Trade.Spot.SpotOrderBook.OrderBookColumnTitles.amount_name'),
									)}
									({getFirstPartPairCode(currentPair || '')})
								</span>
							</div>
							<div className="td td--right">
								<span className="table-header__name">
									{String(L.translate('Trade.Spot.SpotOrderBook.OrderBookColumnTitles.total_name'))}
								</span>
							</div>
						</div>
					</div>
					{(currentLayoutTab === 'general' || currentLayoutTab === 'ask') && (
						<OrderBookTable data={filteredOrderbookAskDataByLayoutTab} type="ask" />
					)}
				</div>

				<LastTradeBlock />

				{(currentLayoutTab === 'general' || currentLayoutTab === 'bid') && (
					<div
						className={getTableClasses(
							workspaceSettings?.orderBookSection,
							!workspaceSettings?.tradingPairsSection,
							currentLayoutTab,
						)}
					>
						<OrderBookTable data={filteredOrderbookBidDataByLayoutTab} type="bid" />
					</div>
				)}
			</div>
		</SocketWithTopicConnectWrapper>
	);
};

export default SpotOrderBook;
