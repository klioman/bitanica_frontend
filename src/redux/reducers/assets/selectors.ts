import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IAssetsData, IAssetsStore } from './types';

// ==========================================:
const getAssetsState = (state: IStoreState): IAssetsStore => state.assets;
export const getAssets = createSelector([getAssetsState], (assets: IAssetsStore) => assets);

// ====================================================:
export const getAssetsIsLoad = createSelector(
	[getAssets],
	(assets: IAssetsStore): boolean => assets.assetsLoader,
);

// ====================================================:
export const getAssetsList = createSelector(
	[getAssets],
	(assets: IAssetsStore): IAssetsData => assets.assetsList,
);
