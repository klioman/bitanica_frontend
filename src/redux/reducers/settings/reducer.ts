/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IChangePassPayload,
	ICheck2faEnables,
	IDisable2faPayload,
	IEnable2faPayload,
	IGenerate2faKeyResponse,
	ISettingsStore,
	IUserSettings,
} from './types';

// ================================================:
export const initialState: ISettingsStore = {
	userSettingsData: null,
	data2fa: null,
	check2faEnables: null,
	userSettingsDataLoader: false,
	displayDisable2faForm: false,
	account2faLoader: false,
	check2faEnablesLoader: true,
	changePassLoader: false,
};

// ================================================:
const settings = createSlice({
	name: '@@auth',
	initialState,
	reducers: {
		userSettingsRequest: (state) => {
			const userSettingsState = state;

			userSettingsState.userSettingsDataLoader = true;
		},
		userSettingsSuccess: (state, action: PayloadAction<IUserSettings>) => {
			const { payload } = action;
			const userSettingsState = state;

			userSettingsState.userSettingsDataLoader = false;
			userSettingsState.userSettingsData = payload;
		},

		changeUserPassRequest: (state, action: PayloadAction<IChangePassPayload>) => {
			const changeUserPassState = state;

			changeUserPassState.changePassLoader = true;
		},
		changeUserPassSuccess: (state) => {
			const changeUserPassState = state;

			changeUserPassState.changePassLoader = false;
		},

		generate2faKeyRequest: (state) => {
			const enable2faState = state;

			enable2faState.account2faLoader = true;
		},
		generate2faKeySuccess: (state, action: PayloadAction<IGenerate2faKeyResponse>) => {
			const { payload } = action;
			const enable2faState = state;

			enable2faState.account2faLoader = false;
			enable2faState.data2fa = payload;
		},

		enable2faRequest: (state, action: PayloadAction<IEnable2faPayload>) => {
			const enable2faState = state;

			enable2faState.account2faLoader = true;
		},
		enable2faSuccess: (state) => {
			const enable2faState = state;

			enable2faState.account2faLoader = false;
			enable2faState.displayDisable2faForm = false;
		},

		disable2faRequest: (state, action: PayloadAction<IDisable2faPayload>) => {
			const disable2faState = state;

			disable2faState.account2faLoader = true;
		},
		disable2faSuccess: (state) => {
			const disable2faState = state;

			disable2faState.account2faLoader = false;
			disable2faState.data2fa = null;
		},

		check2faEnablesRequest: (state) => {
			const check2faEnablesState = state;

			check2faEnablesState.check2faEnablesLoader = true;
		},
		check2faEnablesSuccess: (state, action: PayloadAction<ICheck2faEnables>) => {
			const { payload } = action;
			const check2faEnablesState = state;

			check2faEnablesState.check2faEnablesLoader = false;
			check2faEnablesState.check2faEnables = payload.status;
		},

		displayDisableForm: (state, action: PayloadAction<boolean>) => {
			const { payload } = action;
			const displayDisableFormState = state;

			displayDisableFormState.displayDisable2faForm = payload;
		},

		resetGoogle2fa: (state) => {
			const resetGoogle2faState = state;

			resetGoogle2faState.data2fa = null;
			resetGoogle2faState.account2faLoader = false;
			resetGoogle2faState.check2faEnablesLoader = false;
			resetGoogle2faState.displayDisable2faForm = false;
		},

		settingsInitState: () => initialState,
	},
});

export default settings.reducer;
export const {
	userSettingsRequest,
	userSettingsSuccess,
	changeUserPassRequest,
	changeUserPassSuccess,
	generate2faKeyRequest,
	generate2faKeySuccess,
	check2faEnablesRequest,
	check2faEnablesSuccess,
	displayDisableForm,
	enable2faRequest,
	enable2faSuccess,
	disable2faRequest,
	disable2faSuccess,
	settingsInitState,
	resetGoogle2fa,
} = settings.actions;
