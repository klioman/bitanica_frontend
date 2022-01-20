import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import {
	IGenerateAddressWalletData,
	IWalletsCryptoHistoryData,
	IWalletsData,
	IWalletsStore,
} from './types';

// ==========================================:
const getWalletsState = (state: IStoreState): IWalletsStore => state.wallets;
export const getWallets = createSelector([getWalletsState], (wallets: IWalletsStore) => wallets);

// ====================================================:
export const getWalletsIsLoad = createSelector(
	[getWallets],
	(wallets: IWalletsStore): boolean => wallets.walletsLoader,
);

// ====================================================:
export const getWalletsList = createSelector(
	[getWallets],
	(wallets: IWalletsStore): IWalletsData => wallets.walletsList,
);

// ====================================================:
export const getWalletsAddress = createSelector(
	[getWallets],
	(wallets: IWalletsStore): IGenerateAddressWalletData | null => wallets.generateAddress,
);

// ====================================================:
export const getWalletsCryptoHistoryIsLoad = createSelector(
	[getWallets],
	(wallets: IWalletsStore): boolean => wallets.walletsCryptoHistoryLoader,
);

// ====================================================:
export const getWalletsCryptoHistoryList = createSelector(
	[getWallets],
	(wallets: IWalletsStore): IWalletsCryptoHistoryData => wallets.walletsCryptoHistory,
);
