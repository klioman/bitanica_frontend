/* eslint-disable @typescript-eslint/naming-convention */
import useDecimals from 'hooks/useDecimals';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setTempOrderPrice } from 'redux/reducers/orders/reducer';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { IOrderBookTableItemProps } from './types';

const OrderBookTableItem: FC<IOrderBookTableItemProps> = ({ data, type }) => {
	const { price, quantity_left, total } = data;
	const dispatch = useDispatch();

	const [priceDecimal] = useDecimals();

	const getClassByType = (valueType: string): string => {
		switch (valueType) {
			case 'ask':
				return 'table-value table-value--red';
			case 'bid':
				return 'table-value table-value--green';

			default:
				return 'table-value';
		}
	};

	const handleSetTempOrderPrice = () => {
		dispatch(setTempOrderPrice(Number(price)));
	};

	return (
		<div className="tr orderbook__table-item-tr" onClick={handleSetTempOrderPrice}>
			<div className="orderbook__table-progress" />
			<div className="td">
				<span className={getClassByType(type)}>
					{fixedCropNumber(Number(price), priceDecimal) || price}
				</span>
			</div>
			<div className="td">
				<span className="table-value">{Number(quantity_left).toFixed(6)}</span>
			</div>
			<div className="td td--right">
				<span className="table-value">{total}</span>
			</div>
		</div>
	);
};

export default OrderBookTableItem;
