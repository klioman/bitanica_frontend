import { createSelector } from '@reduxjs/toolkit';
import { IStoreState } from 'redux/types';
import { ISocketsStore } from './types';

// ==========================================:
const getSocketsState = (state: IStoreState): ISocketsStore => state.sockets;
export const getSockets = createSelector([getSocketsState], (sockets: ISocketsStore) => sockets);

// ====================================================:
export const getIsSocketsConnection = createSelector(
	[getSockets],
	(sockets: ISocketsStore): boolean => sockets.isSocketConnection,
);
