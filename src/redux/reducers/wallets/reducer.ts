/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IGenerateAddressWalletPayload,
	IGenerateAddressWalletData,
	IWalletsResponsePayload,
	IWalletsCryptoHistoryRequestPayload,
	IWalletsCryptoHistoryResponsePayload,
	IWalletsStore,
} from './types';

// ================================================:
export const initialState: IWalletsStore = {
	walletsList: null,
	generateAddress: null,
	walletsLoader: false,
	generateAddressLoader: false,
	walletsCryptoHistory: null,
	walletsCryptoHistoryLoader: false,
};

// ================================================:
const wallets = createSlice({
	name: '@@wallets',
	initialState,
	reducers: {
		getWalletsRequest: (state) => {
			const walletsRequestState = state;

			walletsRequestState.walletsLoader = true;
		},

		getWalletsSuccess: (state, action: PayloadAction<IWalletsResponsePayload>) => {
			const { payload } = action;
			const walletsSuccessState = state;

			walletsSuccessState.walletsList = payload;
			walletsSuccessState.walletsLoader = false;
		},

		updateWalletsSuccess: (state, action: PayloadAction<IWalletsResponsePayload>) => {
			const { payload } = action;
			const updateWalletsSuccessState = state;

			updateWalletsSuccessState.walletsList = payload;
			updateWalletsSuccessState.walletsLoader = false;
		},

		getGenerateAddressRequest: (state, action: PayloadAction<IGenerateAddressWalletPayload>) => {
			const generateAddressState = state;

			generateAddressState.generateAddressLoader = true;
		},

		getGenerateAddressSuccess: (state, action: PayloadAction<IGenerateAddressWalletData>) => {
			const { payload } = action;
			const generateAddressState = state;

			generateAddressState.generateAddressLoader = false;
			generateAddressState.generateAddress = payload;
		},
		clearWalletAddress: (state) => {
			const clearWalletAddressState = state;
			clearWalletAddressState.generateAddress = null;
		},

		getWalletsCryptoHistoryRequest: (
			state,
			action: PayloadAction<IWalletsCryptoHistoryRequestPayload>,
		) => {
			const walletsCryptoHistoryRequestState = state;

			walletsCryptoHistoryRequestState.walletsCryptoHistoryLoader = true;
		},

		getWalletsCryptoHistorySuccess: (
			state,
			action: PayloadAction<IWalletsCryptoHistoryResponsePayload>,
		) => {
			const { payload } = action;
			const walletsCryptoHistorySuccessState = state;

			walletsCryptoHistorySuccessState.walletsCryptoHistory = payload;
			walletsCryptoHistorySuccessState.walletsCryptoHistoryLoader = false;
		},

		exportWalletsCryptoHistory: (
			state,
			action: PayloadAction<IWalletsCryptoHistoryRequestPayload>,
		) => {},

		walletsInitState: () => initialState,
	},
});

export default wallets.reducer;
export const {
	getWalletsRequest,
	getWalletsSuccess,
	updateWalletsSuccess,
	getGenerateAddressRequest,
	getGenerateAddressSuccess,
	clearWalletAddress,
	getWalletsCryptoHistoryRequest,
	getWalletsCryptoHistorySuccess,
	exportWalletsCryptoHistory,
	walletsInitState,
} = wallets.actions;
