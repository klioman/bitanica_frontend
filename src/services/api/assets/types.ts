import { IAssetsResponsePayload } from 'redux/reducers/assets/types';

// ==========================================:
export interface IAssetsApi {
	getAssets: () => Promise<IAssetsResponsePayload>;
}
