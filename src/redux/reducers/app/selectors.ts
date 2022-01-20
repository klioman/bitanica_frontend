import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IAppStore } from './types';

// ==========================================:
const getAppState = (state: IStoreState): IAppStore => state.app;
export const getApp = createSelector([getAppState], (app: IAppStore) => app);

// ====================================================:
export const appLanguage = createSelector([getApp], (app): string => app.lang);
