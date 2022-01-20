import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { ITradingSettings, ITradingSettingsStore } from './types';

// ==========================================:
const getTradingSettingsState = (state: IStoreState): ITradingSettingsStore =>
	state.tradingSettings;
export const getTradingSettings = createSelector(
	[getTradingSettingsState],
	(tradingSettings: ITradingSettingsStore) => tradingSettings,
);

// ====================================================:
export const getWorkspaceSettings = createSelector(
	[getTradingSettings],
	(tradingSettings: ITradingSettingsStore): ITradingSettings => tradingSettings.workspaceSettings,
);

// ====================================================:
export const getCurrentPair = createSelector(
	[getTradingSettings],
	(tradingSettings: ITradingSettingsStore): string => tradingSettings.currentPair,
);

// ====================================================:
export const getCurrentInterval = createSelector(
	[getTradingSettings],
	(tradingSettings: ITradingSettingsStore): string => tradingSettings.interval,
);
