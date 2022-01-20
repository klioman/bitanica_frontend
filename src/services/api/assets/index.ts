import { IAssetsResponsePayload } from 'redux/reducers/assets/types';
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { IAssetsApi } from './types';

// ==========================================:
export const assets: IAssetsApi = {
	getAssets: () =>
		http.get<IAssetsResponsePayload>(endpoint.assets.ASSETS).then((response) => response.data),
};
