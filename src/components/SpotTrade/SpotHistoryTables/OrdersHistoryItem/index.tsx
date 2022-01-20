/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';
import { transformFirstLetterToCapitalize } from 'services/utils/capitalize';
import {
	getLocaleDateFromTimestamp,
	getLocaleTimeFromTimestamp,
} from 'services/utils/dateAndTimeHelpers';
import { transformPairCode } from 'services/utils/tradingPairHelpers';
import { IOrdersHistoryItemProps } from './types';

const OrdersHistoryItem: FC<IOrdersHistoryItemProps> = ({ data }) => {
	const { created_at, pair, type, price, average, quantity, total, status, filling } = data;

	const getType = (typeValue: string): string =>
		typeValue?.includes('market') ? 'Market' : 'Limit';

	const getMarketType = (typeValue: string): string => {
		if (typeValue?.includes('sell')) return 'Sell';

		if (typeValue?.includes('buy')) return 'Buy';

		return '-';
	};

	const getClassByType = (statusValue: string): string => {
		if (statusValue?.includes('sell')) return 'td-name td-name--red';

		if (statusValue?.includes('buy')) return 'td-name td-name--green';

		return 'td-name';
	};

	const getClassByStatus = (typeValue: string): string => {
		if (typeValue?.includes('cancelled')) return 'td-name td-name--red';

		if (typeValue?.includes('filled')) return 'td-name td-name--green';

		return 'td-name';
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
				<span className="td-name">{getType(type)}</span>
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
				<span className="td-name">{filling ? `${String(filling)} %` : '-'}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(total).toFixed(6)} USDT</span>
			</div>
			<div className="td td--right">
				<span className={getClassByStatus(String(status))}>
					{transformFirstLetterToCapitalize(String(status || '-'))}
				</span>
			</div>
		</div>
	);
};

export default OrdersHistoryItem;
