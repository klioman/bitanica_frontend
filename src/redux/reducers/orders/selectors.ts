import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { ICalculateLimitOrderData, ICalculateMarketOrderData, IOrdersStore } from './types';

// ==========================================:
const getOrdersState = (state: IStoreState): IOrdersStore => state.orders;
export const getOrders = createSelector([getOrdersState], (orders: IOrdersStore) => orders);

// ====================================================:
export const getCalculateLimitOrder = createSelector(
	[getOrders],
	(orders: IOrdersStore): ICalculateLimitOrderData | null => orders.calculate.limitOrder,
);

// ====================================================:
export const getCalculateMarketOrder = createSelector(
	[getOrders],
	(orders: IOrdersStore): ICalculateMarketOrderData | null => orders.calculate.marketOrder,
);

// ====================================================:
export const getTempOrderPrice = createSelector(
	[getOrders],
	(orders: IOrdersStore): number => orders.tempOrderPrice,
);
