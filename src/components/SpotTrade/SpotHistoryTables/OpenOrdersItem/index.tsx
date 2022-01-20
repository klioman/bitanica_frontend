/* eslint-disable @typescript-eslint/naming-convention */
import { FC, useState } from 'react';
import L from 'i18n-react';
import { useDispatch } from 'react-redux';
import { removeOpenOrdersRequest } from 'redux/reducers/spotTrade/reducer';
import {
	getLocaleDateFromTimestamp,
	getLocaleTimeFromTimestamp,
} from 'services/utils/dateAndTimeHelpers';
import { transformPairCode } from 'services/utils/tradingPairHelpers';
import ConfirmDeletePopup from 'ui/ConfirmDeletePopup';
import { IOpenOrdersItemProps } from './types';

const OpenOrdersItem: FC<IOpenOrdersItemProps> = ({ data }) => {
	const {
		created_at,
		pair,
		type,
		price,
		average,
		quantity,
		filled,
		total,
		trigger_conditions,
		id,
	} = data;

	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const closeModal = () => setOpenModal(false);

	const getType = (triggerValue: string | number | null, typeValue: string): string => {
		if (triggerValue) return 'Stop-Limit';

		return typeValue?.includes('market') ? 'Market' : 'Limit';
	};

	const getMarketType = (typeValue: string): string => {
		if (typeValue?.includes('sell')) return 'Sell';

		if (typeValue?.includes('buy')) return 'Buy';

		return '-';
	};

	const getClassByType = (typeValue: string): string => {
		if (typeValue?.includes('sell')) return 'td-name td-name--red';

		if (typeValue?.includes('buy')) return 'td-name td-name--green';

		return 'td-name';
	};

	const handleRemoveUserOpenOrder = () => {
		dispatch(removeOpenOrdersRequest({ id }));
	};

	return (
		<div className="tr">
			<div className="td">
				<span className="td-name td-name--grey">
					{getLocaleDateFromTimestamp(created_at)} {getLocaleTimeFromTimestamp(created_at)}
				</span>
			</div>
			<div className="td">
				<span className="td-name">{transformPairCode(pair)}</span>
			</div>
			<div className="td">
				<span className="td-name">{getType(trigger_conditions, type)}</span>
			</div>
			<div className="td">
				<span className={getClassByType(type)}>{getMarketType(type)}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(average).toFixed(6) || '-'}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(price).toFixed(6) || '-'}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(quantity).toFixed(6) || '-'}</span>
			</div>
			<div className="td">
				<span className="td-name">{filled ? `${String(filled)} %` : '-'}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(total).toFixed(6)} USDT</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(trigger_conditions).toFixed(6) || '-'}</span>
			</div>
			<div className="td td--right">
				<button
					type="button"
					className="link"
					onClick={() => setOpenModal((prevOpenModal) => !prevOpenModal)}
				>
					{String(L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.cancel_button'))}
				</button>
				<ConfirmDeletePopup
					title={String(
						L.translate('Trade.Spot.SpotHistoryTables.OpenOrdersTable.confirm_delete_order_title'),
					)}
					bodyMessage={String(
						L.translate(
							'Trade.Spot.SpotHistoryTables.OpenOrdersTable.confirm_delete_order_body_message',
						),
					)}
					openModal={openModal}
					closeModal={closeModal}
					handleDelete={handleRemoveUserOpenOrder}
				/>
			</div>
		</div>
	);
};

export default OpenOrdersItem;
