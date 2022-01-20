import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IKycStore, IKycOndatoUrlData, IKycOndatoUserData } from './types';

// ==========================================:
const getKycState = (state: IStoreState): IKycStore => state.kyc;
export const getKyc = createSelector([getKycState], (kyc: IKycStore) => kyc);

// ====================================================:
export const getKycOndatoURLIsLoad = createSelector(
	[getKyc],
	(kyc: IKycStore): boolean => kyc.kycOndatoURLLoader,
);

// ====================================================:
export const getKycOndatoURL = createSelector(
	[getKyc],
	(kyc: IKycStore): IKycOndatoUrlData | null => kyc.kycOndatoURL,
);

// ====================================================:
export const getKycOndatoUserDataIsLoad = createSelector(
	[getKyc],
	(kyc: IKycStore): boolean => kyc.kycOndatoUserDataLoader,
);

// ====================================================:
export const getKycOndatoUserData = createSelector(
	[getKyc],
	(kyc: IKycStore): IKycOndatoUserData | null => kyc.kycOndatoUserData,
);
