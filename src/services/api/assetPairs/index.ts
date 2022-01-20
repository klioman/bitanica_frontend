import {
	IAssetPairsFeesAndLimitsResponsePayload,
	IAssetPairsResponsePayload,
} from 'redux/reducers/assetPairs/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IAssetPairsApi } from './types';

// ==========================================:
export const assetPairs: IAssetPairsApi = {
	getAssetPairs: () =>
		http
			.get<IAssetPairsResponsePayload>(endpoint.assetPairs.ASSET_PAIRS)
			.then((response) => response.data),
	getAssetPairsFeesAndLimits: () =>
		http
			.get<IAssetPairsFeesAndLimitsResponsePayload>(endpoint.assetPairs.ASSET_PAIRS_FEES_AND_LIMITS)
			.then((response) => response.data),
};
