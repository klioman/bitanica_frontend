/* eslint-disable @typescript-eslint/naming-convention */
import useDecimals from 'hooks/useDecimals';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setTempOrderPrice } from 'redux/reducers/orders/reducer';
import { getLocaleTimeFromTimestamp } from 'services/utils/dateAndTimeHelpers';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { IRecentTradesTableItemProps } from './types';

const RecentTradesTableItem: FC<IRecentTradesTableItemProps> = ({ data }) => {
	const { price, quantity, created_at, type } = data;
	const dispatch = useDispatch();

	const [priceDecimal] = useDecimals();

	const getPriceColorClass = (typeValue: string): string => {
		return `table-value ${typeValue === 'sell' ? 'table-value--red' : 'table-value--green'}`;
	};

	const handleSetTempOrderPrice = () => {
		dispatch(setTempOrderPrice(Number(price)));
	};

	return (
		<div className="tr spot-recent-trades__table--item-tr" onClick={handleSetTempOrderPrice}>
			<div className="td">
				<span className={getPriceColorClass(type)}>
					{fixedCropNumber(Number(price), priceDecimal) || price}
				</span>
			</div>
			<div className="td">
				<span className="table-value">{Number(quantity).toFixed(6)}</span>
			</div>
			<div className="td td--right">
				<span className="table-value">{getLocaleTimeFromTimestamp(created_at)}</span>
			</div>
		</div>
	);
};

export default RecentTradesTableItem;
