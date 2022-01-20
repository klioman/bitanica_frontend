import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IAssetPairsData, IAssetPairsFeesAndLimitsData, IAssetPairsStore } from './types';

// ==========================================:
const getAssetPairsState = (state: IStoreState): IAssetPairsStore => state.assetPairs;
export const getAssetPairs = createSelector(
	[getAssetPairsState],
	(assetPairs: IAssetPairsStore) => assetPairs,
);

// ====================================================:
export const getAssetPairsIsLoad = createSelector(
	[getAssetPairs],
	(assetPairs: IAssetPairsStore): boolean => assetPairs.assetPairsLoader,
);

// ====================================================:
export const getAssetPairsList = createSelector(
	[getAssetPairs],
	(assetPairs: IAssetPairsStore): IAssetPairsData => assetPairs.assetPairs,
);

// ====================================================:
export const getAssetPairsFeesAndLimitsIsLoad = createSelector(
	[getAssetPairs],
	(assetPairs: IAssetPairsStore): boolean => assetPairs.assetPairsFeesAndLimitsLoader,
);

// ====================================================:
export const getAssetPairsFeesAndLimitsList = createSelector(
	[getAssetPairs],
	(assetPairs: IAssetPairsStore): IAssetPairsFeesAndLimitsData =>
		assetPairs.assetPairsFeesAndLimits,
);
