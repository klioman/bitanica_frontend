import { store } from 'redux/store';
import { getAuth } from 'redux/reducers/auth/selectors';
import { IAxiosRequestConfig } from './types';

// ==========================================:
const onSuccess = (config: IAxiosRequestConfig) => {
	const requestConfig = config;
	const state = store.getState();
	const auth = getAuth(state);

	if (auth && auth.accessToken) {
		requestConfig.headers = {
			Authorization: `Bearer ${String(auth.accessToken)}`,
		};
	}

	return requestConfig;
};

export default onSuccess;
