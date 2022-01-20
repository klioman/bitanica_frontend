/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISocketsStore } from './types';

// ================================================:
export const initialState: ISocketsStore = {
	isSocketConnection: false,
	socketToken: null,
};

// ================================================:
const sockets = createSlice({
	name: '@@sockets',
	initialState,
	reducers: {
		setSocketsConnect: (state) => {
			const socketConnectionState = state;

			socketConnectionState.isSocketConnection = true;
		},

		setSocketsDisconnect: (state) => {
			const socketDisconnectState = state;

			socketDisconnectState.isSocketConnection = false;
		},

		socketOpenConnection: (state, action: PayloadAction<string | null>) => {
			const { payload } = action;

			const socketOpenState = state;

			socketOpenState.socketToken = payload;
		},

		socketClosedConnection: () => {},

		socketSendMessage: (state, action: PayloadAction<[number, string]>) => {},

		socketsInitState: () => initialState,
	},
});

export default sockets.reducer;
export const {
	setSocketsConnect,
	setSocketsDisconnect,
	socketOpenConnection,
	socketClosedConnection,
	socketSendMessage,
	socketsInitState,
} = sockets.actions;
