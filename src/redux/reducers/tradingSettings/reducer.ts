/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITradingSettingsPayload, ITradingSettingsStore } from './types';

// ================================================:
export const initialState: ITradingSettingsStore = {
	workspaceSettings: {
		orderBookSection: true,
		tradingPairsSection: true,
	},
	currentPair: 'btc_usdt',
	interval: '60',
};

// ================================================:
const tradingSettings = createSlice({
	name: '@@tradingSettings',
	initialState,
	reducers: {
		setWorkspaceSettings: (state, action: PayloadAction<ITradingSettingsPayload>) => {
			const { payload } = action;
			const workspaceSettingsState = state;

			workspaceSettingsState.workspaceSettings = payload;
		},

		setCurrentPair: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			const currentPairState = state;

			currentPairState.currentPair = payload;
		},

		setCurrentInterval: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			const intervalState = state;

			intervalState.interval = payload;
		},

		tradingSettingsInitState: () => initialState,
	},
});

export default tradingSettings.reducer;
export const {
	setWorkspaceSettings,
	setCurrentPair,
	setCurrentInterval,
	tradingSettingsInitState,
} = tradingSettings.actions;
