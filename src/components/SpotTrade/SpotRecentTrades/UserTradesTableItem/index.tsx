/* eslint-disable @typescript-eslint/naming-convention */
import useDecimals from 'hooks/useDecimals';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setTempOrderPrice } from 'redux/reducers/orders/reducer';
import { getLocaleTimeFromTimestamp } from 'services/utils/dateAndTimeHelpers';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { IUserTradesTableItemProps } from './types';

const UserTradesTableItem: FC<IUserTradesTableItemProps> = ({ data }) => {
	const { price_filled, asset_get_change, asset_sold_change, created_at, type } = data;
	const dispatch = useDispatch();

	const [priceDecimal] = useDecimals();

	const getPriceColorClass = (typeValue: string): string => {
		return `table-value ${typeValue?.includes('sell') ? 'table-value--red' : 'table-value--green'}`;
	};

	const handleSetTempOrderPrice = () => {
		dispatch(setTempOrderPrice(Number(price_filled)));
	};

	return (
		<div className="tr spot-recent-trades__table--item-tr" onClick={handleSetTempOrderPrice}>
			<div className="td">
				<span className={getPriceColorClass(type)}>
					{fixedCropNumber(Number(price_filled), priceDecimal) || price_filled}
				</span>
			</div>
			<div className="td">
				<span className="table-value">
					{type?.includes('sell') && Number(asset_sold_change).toFixed(6)}
					{type?.includes('buy') && Number(asset_get_change).toFixed(6)}
				</span>
			</div>
			<div className="td td--right">
				<span className="table-value">{getLocaleTimeFromTimestamp(created_at)}</span>
			</div>
		</div>
	);
};

export default UserTradesTableItem;
