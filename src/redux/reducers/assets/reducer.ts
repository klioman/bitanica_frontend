import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAssetsResponsePayload, IAssetsStore } from './types';

// ================================================:
export const initialState: IAssetsStore = {
	assetsList: null,
	assetsLoader: false,
};

// ================================================:
const assets = createSlice({
	name: '@@assets',
	initialState,
	reducers: {
		getAssetsRequest: (state) => {
			const assetsRequestState = state;

			assetsRequestState.assetsLoader = true;
		},

		getAssetsSuccess: (state, action: PayloadAction<IAssetsResponsePayload>) => {
			const { payload } = action;
			const assetsSuccessState = state;

			assetsSuccessState.assetsList = payload;
			assetsSuccessState.assetsLoader = false;
		},

		assetsInitState: () => initialState,
	},
});

export default assets.reducer;
export const { getAssetsRequest, getAssetsSuccess, assetsInitState } = assets.actions;
