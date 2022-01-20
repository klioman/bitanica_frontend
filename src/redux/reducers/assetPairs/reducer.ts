/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IAssetPairsFeesAndLimitsResponsePayload,
	IAssetPairsResponsePayload,
	IAssetPairsStore,
} from './types';

// ==========================================:
export const initialState: IAssetPairsStore = {
	assetPairs: null,
	assetPairsLoader: false,
	assetPairsFeesAndLimits: null,
	assetPairsFeesAndLimitsLoader: false,
};

// ==========================================:
const assetPairs = createSlice({
	name: '@@assetPairs',
	initialState,
	reducers: {
		getAssetPairsRequest: (state) => {
			const assetPairsRequestState = state;

			assetPairsRequestState.assetPairsLoader = true;
		},

		getAssetPairsSuccess: (state, action: PayloadAction<IAssetPairsResponsePayload>) => {
			const { payload } = action;
			const assetPairsSuccessState = state;

			assetPairsSuccessState.assetPairs = payload;
			assetPairsSuccessState.assetPairsLoader = false;
		},

		updateAssetPairsSuccess: (state, action: PayloadAction<IAssetPairsResponsePayload>) => {
			const { payload } = action;
			const assetPairsUpdateState = state;

			assetPairsUpdateState.assetPairs = payload;
			assetPairsUpdateState.assetPairsLoader = false;
		},

		getAssetPairsFeesAndLimitsRequest: (state) => {
			const assetPairsFeesAndLimitsRequestState = state;

			assetPairsFeesAndLimitsRequestState.assetPairsFeesAndLimitsLoader = true;
		},

		getAssetPairsFeesAndLimitsSuccess: (
			state,
			action: PayloadAction<IAssetPairsFeesAndLimitsResponsePayload>,
		) => {
			const { payload } = action;
			const assetPairsFeesAndLimitsSuccessState = state;

			assetPairsFeesAndLimitsSuccessState.assetPairsFeesAndLimits = payload;
			assetPairsFeesAndLimitsSuccessState.assetPairsFeesAndLimitsLoader = false;
		},

		assetPairsInitState: () => initialState,
	},
});

export default assetPairs.reducer;
export const {
	getAssetPairsRequest,
	getAssetPairsSuccess,
	updateAssetPairsSuccess,
	getAssetPairsFeesAndLimitsRequest,
	getAssetPairsFeesAndLimitsSuccess,
	assetPairsInitState,
} = assetPairs.actions;
