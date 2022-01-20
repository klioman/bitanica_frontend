/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getSpotOrderBookIsLoad } from 'redux/reducers/spotTrade/selectors';
import Loader from 'ui/Loader';
import OrderBookTableItem from '../OrderBookTableItem';
import { IOrderBookTableProps } from './types';

const OrderBookTable: FC<IOrderBookTableProps> = ({ data, type }) => {
	const orderBookListIsLoad = useSelector(getSpotOrderBookIsLoad);

	return (
		<div className={`table-body ${type === 'ask' ? 'orderbook-ask-table-body' : ''}`}>
			{data?.length &&
				!orderBookListIsLoad &&
				data.map((el) => (
					<OrderBookTableItem key={Number(el.price) + Number(el.total)} data={el} type={type} />
				))}

			{!data?.length && orderBookListIsLoad && (
				<div className="orderbook-loader-wrapper">
					<Loader />
				</div>
			)}
		</div>
	);
};

export default OrderBookTable;
