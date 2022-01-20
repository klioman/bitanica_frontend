export interface ITradingSettingsStore {
	workspaceSettings: ITradingSettings;
	currentPair: string;
	interval: string;
}

export interface ITradingSettings {
	orderBookSection: boolean;
	tradingPairsSection: boolean;
}

export type ITradingSettingsPayload = ITradingSettings;
