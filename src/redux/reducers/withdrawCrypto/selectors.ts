import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { IWitdrawCryptoStore } from './types';

// ==========================================:
const getWithdrawCryptoState = (state: IStoreState): IWitdrawCryptoStore => state.withdrawCrypto;
export const getWithdrawCrypto = createSelector(
	[getWithdrawCryptoState],
	(withdrawCrypto: IWitdrawCryptoStore) => withdrawCrypto,
);

// ====================================================:
export const getToWithdrawalAddressIsValid = createSelector(
	[getWithdrawCrypto],
	(withdrawCrypto: IWitdrawCryptoStore): boolean => withdrawCrypto.toWithdrawalAddresIsValid,
);

// ====================================================:
export const getСheckWithdrawalAddressLoader = createSelector(
	[getWithdrawCrypto],
	(withdrawCrypto: IWitdrawCryptoStore): boolean => withdrawCrypto.checkWithdrawalAddressLoader,
);
