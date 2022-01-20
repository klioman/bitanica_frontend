import { store } from 'redux/store';
import {
	setSocketsConnect,
	setSocketsDisconnect,
	socketOpenConnection,
	socketsInitState,
} from './reducer';
import { ISocketsStore } from './types';

// isSocketConnection: false,
// socketToken: null,

// ================================================:
describe('Sockets reducer:', () => {
	it('Get sockets initial state', () => {
		store.dispatch(socketsInitState());

		const afterState: ISocketsStore = store.getState().sockets;

		expect(afterState.isSocketConnection).toBe(false);
		expect(afterState.socketToken).toEqual(null);
	});

	it('Set socket connect', () => {
		const state: ISocketsStore = store.getState().sockets;

		expect(state.isSocketConnection).toBe(false);

		store.dispatch(setSocketsConnect());
		const afterState: ISocketsStore = store.getState().sockets;
		expect(afterState.isSocketConnection).toBe(true);
	});

	it('Set socket disconnect', () => {
		const state: ISocketsStore = store.getState().sockets;

		expect(state.isSocketConnection).toBe(true);

		store.dispatch(setSocketsDisconnect());
		const afterState: ISocketsStore = store.getState().sockets;
		expect(afterState.isSocketConnection).toBe(false);
	});

	it('Socket open connection', () => {
		const state: ISocketsStore = store.getState().sockets;

		expect(state.socketToken).toEqual(null);

		const testSocketTocken = 'testsockettocken';

		store.dispatch(socketOpenConnection(testSocketTocken));
		const afterState: ISocketsStore = store.getState().sockets;
		expect(afterState.socketToken).toBe(testSocketTocken);
	});
});
