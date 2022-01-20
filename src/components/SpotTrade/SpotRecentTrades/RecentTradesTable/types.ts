import { IRecentTradesItem } from 'redux/reducers/spotTrade/types';

export interface IRecentTradesTableProps {
	data: Array<IRecentTradesItem> | null;
}
