import { IOrderBookAskData, IOrderBookBidData } from 'redux/reducers/spotTrade/types';

export interface IOrderBookTableProps {
	data: Array<IOrderBookAskData> | Array<IOrderBookBidData> | null;
	type: string;
}
