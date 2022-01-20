/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';
import {
	getLocaleDateFromTimestamp,
	getLocaleTimeFromTimestamp,
} from 'services/utils/dateAndTimeHelpers';
import { transformPairCode } from 'services/utils/tradingPairHelpers';
import { ITradesHistoryItemProps } from './types';

const TradesHistoryItem: FC<ITradesHistoryItemProps> = ({ data }) => {
	const {
		created_at,
		pair,
		type,
		price_filled,
		price_requested,
		fee,
		asset_get_change,
		asset_sold_change,
	} = data;

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
				<span className={getClassByType(type)}>{getMarketType(type)}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(price_requested || price_filled).toFixed(6) || '-'}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(price_filled).toFixed(6)}</span>
			</div>
			<div className="td">
				<span className="td-name">{Number(fee).toFixed(6) || '-'}</span>
			</div>
			<div className="td td--right">
				<span className="td-name">
					{type?.includes('sell') && Number(asset_sold_change).toFixed(6)}
					{type?.includes('buy') && Number(asset_get_change).toFixed(6)}
				</span>
			</div>
		</div>
	);
};

export default TradesHistoryItem;
