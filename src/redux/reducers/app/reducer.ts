import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppStore, IMobileMenu } from './types';

// ==========================================:
const initialState: IAppStore = {
	mobileMenu: false,
	lang: 'EN',
};

// ==========================================:
const app = createSlice({
	name: '@@app',
	initialState,
	reducers: {
		changeAppLanguage: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			const appLanguageState = state;

			appLanguageState.lang = payload;
		},
		mobileMenu: (state, action: PayloadAction<IMobileMenu>) => {
			const { payload } = action;
			const mobileMenuState = state;

			mobileMenuState.mobileMenu = payload.open;
		},
	},
});

export default app.reducer;
export const { mobileMenu, changeAppLanguage } = app.actions;
