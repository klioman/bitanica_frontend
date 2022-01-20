import { FC, useEffect, useState, useMemo } from 'react';
import L from 'i18n-react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getUserTradesRequest } from 'redux/reducers/spotTrade/reducer';
import { getSpotUserTrades, getSpotUserTradesIsLoad } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import Loader from 'ui/Loader';
import FilteredBar from '../FilteredBar';
import TradesHistoryItem from '../TradesHistoryItem';
import { ITradeHistoryProps } from './types';

// ================================================:
const TradesHitory: FC<ITradeHistoryProps> = ({ otherPairsIsHide }) => {
	const tradesHistory = useSelector(getSpotUserTrades);
	const tradesHistoryIsLoad = useSelector(getSpotUserTradesIsLoad);

	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);

	const currentPair = useSelector(getCurrentPair);
	const dispatch = useDispatch();

	const [currentPeriod, setCurrentPeriod] = useState<null | number>(null);

	const filteredTradesHistoryByOtherPair = useMemo(() => {
		return otherPairsIsHide && tradesHistory?.data?.length
			? tradesHistory?.data?.filter((el) => el.pair === currentPair)
			: tradesHistory?.data;
	}, [otherPairsIsHide, tradesHistory?.data, currentPair]);

	useEffect(() => {
		if (authIsAuthenticated) {
			dispatch(
				getUserTradesRequest({
					params: {
						current_page: 1,
						per_page: 100,
					},
				}),
			);
		}
	}, [dispatch, authIsAuthenticated, currentPair]);

	const handleSearchPerPeriod = (periodValue: number | null) => {
		dispatch(
			getUserTradesRequest({
				params: {
					current_page: 1,
					per_page: 100,
					period: periodValue === null ? null : periodValue + 1,
				},
			}),
		);
	};

	const hadleSearchDataPerDate = (date: [Date | null, Date | null]) => {
		const [startDate, endDate] = date;

		if (startDate && !endDate) {
			dispatch(
				getUserTradesRequest({
					params: {
						current_page: 1,
						per_page: 100,
						start_date: format(startDate, 'yyyy-MM-dd'),
					},
				}),
			);

			setCurrentPeriod(null);
			return;
		}

		if (startDate && endDate) {
			dispatch(
				getUserTradesRequest({
					params: {
						current_page: 1,
						per_page: 100,
						start_date: format(startDate, 'yyyy-MM-dd'),
						end_date: format(endDate, 'yyyy-MM-dd'),
					},
				}),
			);
		} else {
			dispatch(
				getUserTradesRequest({
					params: {
						current_page: 1,
						per_page: 100,
					},
				}),
			);
		}

		setCurrentPeriod(null);
	};

	return (
		<>
			<FilteredBar
				handleSearch={hadleSearchDataPerDate}
				period={currentPeriod}
				setCurrentPeriod={setCurrentPeriod}
				handleSearchPerPeriod={handleSearchPerPeriod}
			/>

			<div className="table market-footer__table market-footer__table--trade-history">
				<div className="table-header">
					<div className="tr">
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.TradesHitoryTable.date_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.TradesHitoryTable.pair_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.TradesHitoryTable.side_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.TradesHitoryTable.price_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate(
										'Trade.Spot.SpotHistoryTables.TradesHitoryTable.executed_column_name',
									),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.TradesHitoryTable.fee_column_name'),
								)}
							</span>
						</div>
						<div className="td td--right">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.TradesHitoryTable.total_column_name'),
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="table-body">
					{tradesHistoryIsLoad && (
						<div className="open-orders-history-loader-wrapper">
							<Loader />
						</div>
					)}
					{!tradesHistoryIsLoad && filteredTradesHistoryByOtherPair?.length
						? filteredTradesHistoryByOtherPair?.map((order) => (
								<TradesHistoryItem key={order.id} data={order} />
						  ))
						: null}

					{!tradesHistoryIsLoad && filteredTradesHistoryByOtherPair?.length === 0 && (
						<span className="table-empty">
							{String(
								L.translate(
									'Trade.Spot.SpotHistoryTables.TradesHitoryTable.no_trades_history_text',
								),
							)}
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default TradesHitory;
