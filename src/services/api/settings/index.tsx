import { http } from 'services/http';
import { endpoint } from 'services/endpoint';
import {
	IChangePassPayload,
	ICheck2faEnables,
	IDisable2faPayload,
	IEnable2faPayload,
	IGenerate2faKeyResponse,
	IUserSettings,
} from 'redux/reducers/settings/types';
import { ISettingsApi } from './types';

// ==========================================:
export const settings: ISettingsApi = {
	userSettings: () =>
		http.get<IUserSettings>(endpoint.settings.USER_SETTINGS).then((response) => response.data),

	changePassword: (payload) =>
		http.put<IChangePassPayload>(endpoint.settings.CHANGE_PASSWORD, payload),

	generate2faKey: () =>
		http
			.get<IGenerate2faKeyResponse>(endpoint.settings.GENERATE_2FA_KEY)
			.then((response) => response.data),

	check2faEnables: () =>
		http
			.get<ICheck2faEnables>(endpoint.settings.CHECK_ENABLED_2FA)
			.then((response) => response.data),

	enable2fa: (payload) => http.post<IEnable2faPayload>(endpoint.settings.ENABLE_2FA, payload),

	disable2fa: (payload) => http.post<IDisable2faPayload>(endpoint.settings.DISABLE_2FA, payload),
};
