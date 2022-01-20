/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IAssetPairsFeesAndLimitsResponsePayload,
	IAssetPairsResponsePayload,
} from 'redux/reducers/assetPairs/types';

// ==========================================:
export interface IAssetPairsApi {
	getAssetPairs: () => Promise<IAssetPairsResponsePayload>;
	getAssetPairsFeesAndLimits: () => Promise<IAssetPairsFeesAndLimitsResponsePayload>;
}
