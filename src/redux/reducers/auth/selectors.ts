import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IAuthStore } from 'redux/reducers/auth/types';

// ==========================================:
const getAuthState = (state: IStoreState): IAuthStore => state.auth;
export const getAuth = createSelector([getAuthState], (auth: IAuthStore) => auth);

// ====================================================:
export const getAuthIsAuthenticated = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => !!(auth.isAuthenticated && auth.accessToken),
);

// ====================================================:
export const getAuthIsNotAuthenticated = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => !auth.isAuthenticated && !auth.accessToken,
);

// ====================================================:
export const getAuthTokenRefresh = createSelector(
	[getAuth],
	(auth: IAuthStore): string | null => auth.refreshToken,
);

// ====================================================:
export const getLoginIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.loginLoader,
);

// ====================================================:
export const getIpConfirmIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.ipConfirmLoader,
);

// ====================================================:
export const getForgotPassIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.forgotPasswordLoader,
);

// ====================================================:
export const getEmailConfirmIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.emailConfirmLoader,
);

// ====================================================:
export const getEmailConfirm = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.emailConfirm,
);

// ====================================================:
export const getEmailResetConfirmTokenIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.emailResetConfirmTokenLoader,
);

// ====================================================:
export const getEmailResetConfirmTokenStatus = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.emailResetConfirmTokenMessage,
);

// ====================================================:
export const getCreateNewPassIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.createNewPasswordLoader,
);

// ====================================================:
export const getRegistrIsLoad = createSelector(
	[getAuth],
	(auth: IAuthStore): boolean => auth.registrLoader,
);

// ====================================================:
export const getSocketToken = createSelector(
	[getAuth],
	(auth: IAuthStore): string | null => auth.socketToken,
);
