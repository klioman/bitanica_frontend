import L from 'i18n-react';
import { authInitState } from 'redux/reducers/auth/reducer';
import { store } from 'redux/store';
import { notificationContainer } from 'services/utils/notificationContainer';
import { IAxiosError, IAxiosRequestConfig } from './types';

// ==========================================:
const onError = (error: IAxiosError) => {
	const status = error.response ? error.response.status : null;
	const errorResponse: IAxiosRequestConfig = error.config;
	const token = store.getState().auth.accessToken;

	if (status === 401 && !errorResponse._retry && token) {
		store.dispatch(authInitState());
		notificationContainer(String(L.translate(`Errors.session_has_ended`)), 'info');
	}

	if (status === 403 && !errorResponse._retry && token) {
		notificationContainer(String(L.translate(`Errors.user_blocked`)), 'error');
	}

	return Promise.reject(error);
};

export default onError;
