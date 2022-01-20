import { FC, useEffect, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getOpenOrdersRequest, removeAllOpenOrdersRequest } from 'redux/reducers/spotTrade/reducer';
import {
	getSpotUserOpenOrders,
	getSpotUserOpenOrdersIsLoad,
} from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import ConfirmDeletePopup from 'ui/ConfirmDeletePopup';
import Loader from 'ui/Loader';
import OpenOrdersItem from '../OpenOrdersItem';
import { IOpenOrdersProps } from './types';

const OpenOrders: FC<IOpenOrdersProps> = ({ otherPairsIsHide }) => {
	const openOrders = useSelector(getSpotUserOpenOrders);
	const openOrdersIsLoad = useSelector(getSpotUserOpenOrdersIsLoad);

	const currentPair = useSelector(getCurrentPair);
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const closeModal = () => setOpenModal(false);

	const filteredOpenOrdersByOtherPair = useMemo(() => {
		return otherPairsIsHide && openOrders?.data?.length
			? openOrders?.data?.filter((el) => el.pair === currentPair)
			: openOrders?.data;
	}, [otherPairsIsHide, openOrders?.data, currentPair]);

	useEffect(() => {
		if (authIsAuthenticated) {
			dispatch(
				getOpenOrdersRequest({
					params: {
						per_page: 100,
					},
				}),
			);
		}
	}, [dispatch, authIsAuthenticated]);

	const handleRemoveUserAllOpenOrders = () => {
		if (openOrders?.data.length) {
			dispatch(removeAllOpenOrdersRequest(null));
		}

		closeModal();
	};

	return (
		<div className="table market-footer__table">
			<div className="table-header">
				<div className="tr">
					<div className="td">
						<span className="table-header__name">
							{String(L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.date_column_name'))}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.pair_column_name'))}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.type_column_name'))}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.side_column_name'))}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.average_column_name'),
							)}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.price_column_name'),
							)}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.amount_column_name'),
							)}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.filled_column_name'),
							)}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.total_column_name'),
							)}
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate(
									'Trade.Spot.SpotHistoryTables.OpenOrdersTable.trigger_conditions_column_name',
								),
							)}
						</span>
					</div>
					<div className="td td--right">
						<button
							type="button"
							className="link"
							onClick={() => setOpenModal((prevOpenModal) => !prevOpenModal)}
							disabled={!openOrders?.data.length}
						>
							{String(
								L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.cancel_all_button'),
							)}
						</button>
						<ConfirmDeletePopup
							title={String(
								L.translate(
									'Trade.Spot.SpotHistoryTables.OpenOrdersTable.confirm_delete_all_orders_title',
								),
							)}
							bodyMessage={String(
								L.translate(
									'Trade.Spot.SpotHistoryTables.OpenOrdersTable.confirm_delete_all_body_message',
								),
							)}
							openModal={openModal}
							closeModal={closeModal}
							handleDelete={handleRemoveUserAllOpenOrders}
						/>
					</div>
				</div>
			</div>
			<div className="table-body">
				{openOrdersIsLoad && (
					<div className="open-orders-history-loader-wrapper">
						<Loader />
					</div>
				)}
				{!openOrdersIsLoad && filteredOpenOrdersByOtherPair?.length
					? filteredOpenOrdersByOtherPair?.map((order) => (
							<OpenOrdersItem key={order.id} data={order} />
					  ))
					: null}

				{!openOrdersIsLoad && filteredOpenOrdersByOtherPair?.length === 0 && (
					<span className="table-empty">
						{String(
							L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.no_open_orders_text'),
						)}
					</span>
				)}
			</div>
		</div>
	);
};

export default OpenOrders;
