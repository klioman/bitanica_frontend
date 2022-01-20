import { IOrderBookAskData, IOrderBookBidData } from 'redux/reducers/spotTrade/types';

export interface IOrderBookTableItemProps {
	data: IOrderBookAskData | IOrderBookBidData;
	type: string;
}
