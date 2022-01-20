import { FC, useState, useMemo, useEffect } from 'react';
import L from 'i18n-react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getOrdersHistoryRequest } from 'redux/reducers/spotTrade/reducer';
import {
	getSpotUserOrdersHistory,
	getSpotUserOrdersHistoryIsLoad,
} from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import Loader from 'ui/Loader';
import FilteredBar from '../FilteredBar';
import OrdersHistoryItem from '../OrdersHistoryItem';
import { IOrdersHistoryProps } from './types';

// ================================================:
const OrdersHistory: FC<IOrdersHistoryProps> = ({ otherPairsIsHide }) => {
	const ordersHistory = useSelector(getSpotUserOrdersHistory);
	const ordersHistoryIsLoad = useSelector(getSpotUserOrdersHistoryIsLoad);

	const [currentPeriod, setCurrentPeriod] = useState<null | number>(null);

	const currentPair = useSelector(getCurrentPair);
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);
	const dispatch = useDispatch();

	const filteredOrdersHistoryByOtherPair = useMemo(() => {
		return otherPairsIsHide && ordersHistory?.data?.length
			? ordersHistory?.data?.filter((el) => el.pair === currentPair)
			: ordersHistory?.data;
	}, [otherPairsIsHide, ordersHistory?.data, currentPair]);

	useEffect(() => {
		if (authIsAuthenticated) {
			dispatch(
				getOrdersHistoryRequest({
					params: {
						per_page: 100,
					},
				}),
			);
		}
	}, [dispatch, authIsAuthenticated]);

	const handleSearchPerPeriod = (periodValue: number | null) => {
		dispatch(
			getOrdersHistoryRequest({
				params: {
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
				getOrdersHistoryRequest({
					params: {
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
				getOrdersHistoryRequest({
					params: {
						per_page: 100,
						start_date: format(startDate, 'yyyy-MM-dd'),
						end_date: format(endDate, 'yyyy-MM-dd'),
					},
				}),
			);
		} else {
			dispatch(
				getOrdersHistoryRequest({
					params: {
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

			<div className="table market-footer__table spot-closed-order-history-table">
				<div className="table-header">
					<div className="tr">
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.date_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.pair_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.type_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.side_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate(
										'Trade.Spot.SpotHistoryTables.OrdersHistoryTable.average_column_name',
									),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.price_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.amount_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.filled_column_name'),
								)}
							</span>
						</div>
						<div className="td">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.total_column_name'),
								)}
							</span>
						</div>
						<div className="td td--right">
							<span className="table-header__name">
								{String(
									L.translate('Trade.Spot.SpotHistoryTables.OrdersHistoryTable.status_column_name'),
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="table-body">
					{ordersHistoryIsLoad && (
						<div className="open-orders-history-loader-wrapper">
							<Loader />
						</div>
					)}
					{!ordersHistoryIsLoad && filteredOrdersHistoryByOtherPair?.length
						? filteredOrdersHistoryByOtherPair?.map((order) => (
								<OrdersHistoryItem key={order.id} data={order} />
						  ))
						: null}

					{!ordersHistoryIsLoad && filteredOrdersHistoryByOtherPair?.length === 0 && (
						<span className="table-empty">
							{String(
								L.translate(
									'Trade.Spot.SpotHistoryTables.OrdersHistoryTable.no_orders_history_text',
								),
							)}
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default OrdersHistory;
