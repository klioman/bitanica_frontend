import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import {
	IOrderBookData,
	IRecentTradesItem,
	ISpotTradeStore,
	IUserTradesData,
	IOpenOrdersData,
	IOrdersHistoryData,
} from './types';

// ==========================================:
const getSpotTradeState = (state: IStoreState): ISpotTradeStore => state.spotTrade;
export const getSpotTrade = createSelector(
	[getSpotTradeState],
	(spotTrade: ISpotTradeStore) => spotTrade,
);

// ====================================================:
export const getSpotOrderBookIsLoad = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): boolean => spotTrade.orderBookLoader,
);

// ====================================================:
export const getSpotOrderBook = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): IOrderBookData | null => spotTrade.orderBook,
);

// ====================================================:
export const getSpotRecentTradesIsLoad = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): boolean => spotTrade.recentTradesLoader,
);

// ====================================================:
export const getSpotRecentTrades = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): Array<IRecentTradesItem> | null => spotTrade.recentTrades,
);

// ====================================================:
export const getSpotUserTradesIsLoad = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): boolean => spotTrade.userTradesLoader,
);

// ====================================================:
export const getSpotUserTrades = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): IUserTradesData | null => spotTrade.userTrades,
);

// ====================================================:
export const getSpotUserOpenOrdersIsLoad = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): boolean => spotTrade.tablesHistory.openOrdersLoader,
);

// ====================================================:
export const getSpotUserOpenOrders = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): IOpenOrdersData | null => spotTrade.tablesHistory.openOrders,
);

// ====================================================:
export const getSpotUserOrdersHistoryIsLoad = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): boolean => spotTrade.tablesHistory.ordersHistoryLoader,
);

// ====================================================:
export const getSpotUserOrdersHistory = createSelector(
	[getSpotTrade],
	(spotTrade: ISpotTradeStore): IOrdersHistoryData | null => spotTrade.tablesHistory.ordersHistory,
);
