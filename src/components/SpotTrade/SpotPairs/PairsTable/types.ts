import { ITradingSettings } from 'redux/reducers/tradingSettings/types';

export interface IPairsTableProps {
	workspaceSettings: ITradingSettings;
	searchData: string;
	currentAssetData: string;
}
