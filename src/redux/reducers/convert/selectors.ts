import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IConvertStore, IExchangeRateData } from './types';

// ==========================================:
const getConvertState = (state: IStoreState): IConvertStore => state.convert;
export const getConvert = createSelector([getConvertState], (convert: IConvertStore) => convert);

// ====================================================:
export const getExchangeRateIsLoad = createSelector(
	[getConvert],
	(convert: IConvertStore): boolean => convert.exchangeRateLoader,
);

// ====================================================:
export const getExchangeRate = createSelector(
	[getConvert],
	(convert: IConvertStore): IExchangeRateData | null => convert.exchangeRate,
);

// ====================================================:
export const getMakeExchangeIsLoad = createSelector(
	[getConvert],
	(convert: IConvertStore): boolean => convert.makeExchangeLoader,
);
