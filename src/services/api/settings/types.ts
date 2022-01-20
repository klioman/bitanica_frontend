import { AxiosResponse } from 'axios';
import {
	IChangePassPayload,
	ICheck2faEnables,
	IDisable2faPayload,
	IEnable2faPayload,
	IGenerate2faKeyResponse,
	IUserSettings,
} from 'redux/reducers/settings/types';

// ==========================================:
export interface ISettingsApi {
	userSettings: () => Promise<IUserSettings>;
	changePassword: (payload: IChangePassPayload) => Promise<AxiosResponse>;
	check2faEnables: () => Promise<ICheck2faEnables>;
	generate2faKey: () => Promise<IGenerate2faKeyResponse>;
	enable2fa: (payload: IEnable2faPayload) => Promise<AxiosResponse>;
	disable2fa: (payload: IDisable2faPayload) => Promise<AxiosResponse>;
}
