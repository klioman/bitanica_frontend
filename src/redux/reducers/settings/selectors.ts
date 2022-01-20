import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IGenerate2faKeyResponse, ISettingsStore, IUserSettingsData } from './types';

// ==========================================:
const getSettingsState = (state: IStoreState): ISettingsStore => state.settings;
export const getSettings = createSelector(
	[getSettingsState],
	(settings: ISettingsStore) => settings,
);

// ====================================================:
export const get2faIsLoad = createSelector(
	[getSettings],
	(settings: ISettingsStore): boolean => settings.account2faLoader,
);

// ====================================================:
export const getDisplayDisable2faForm = createSelector(
	[getSettings],
	(settings: ISettingsStore): boolean => settings.displayDisable2faForm,
);

// ====================================================:
export const get2faData = createSelector(
	[getSettings],
	(settings: ISettingsStore): null | IGenerate2faKeyResponse => settings.data2fa,
);

// ====================================================:
export const getCheck2faEnablesLoader = createSelector(
	[getSettings],
	(settings: ISettingsStore): boolean => settings.check2faEnablesLoader,
);

// ====================================================:
export const getChangePassLoader = createSelector(
	[getSettings],
	(settings: ISettingsStore): boolean => settings.changePassLoader,
);

// ====================================================:
export const getDisplayDisableBlock = createSelector(
	[getSettings],
	(settings: ISettingsStore): null | string => settings.check2faEnables,
);

// ====================================================:
export const getUserSettingsData = createSelector(
	[getSettings],
	(settings: ISettingsStore): IUserSettingsData | undefined => settings.userSettingsData?.user,
);

// ====================================================:
export const ggetUserSettingsDataLoader = createSelector(
	[getSettings],
	(settings: ISettingsStore): boolean => settings.userSettingsDataLoader,
);
