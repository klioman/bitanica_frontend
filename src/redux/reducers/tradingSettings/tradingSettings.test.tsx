import { store } from 'redux/store';
import {
	setCurrentInterval,
	setCurrentPair,
	setWorkspaceSettings,
	tradingSettingsInitState,
} from './reducer';
import { ITradingSettings, ITradingSettingsStore } from './types';

// ================================================:
describe('Trading settings reducer:', () => {
	it('Get trading settings initial state', () => {
		store.dispatch(tradingSettingsInitState());

		const afterState: ITradingSettingsStore = store.getState().tradingSettings;

		expect(afterState.workspaceSettings).toEqual({
			orderBookSection: true,
			tradingPairsSection: true,
		});
		expect(afterState.currentPair).toBe('btc_usdt');
		expect(afterState.interval).toBe('60');
	});

	it('Set workspace settings', () => {
		const state: ITradingSettingsStore = store.getState().tradingSettings;

		expect(state.workspaceSettings).toEqual({
			orderBookSection: true,
			tradingPairsSection: true,
		});

		const testSetWorkspaceData: ITradingSettings = {
			orderBookSection: false,
			tradingPairsSection: false,
		};

		store.dispatch(setWorkspaceSettings(testSetWorkspaceData));
		const afterState: ITradingSettingsStore = store.getState().tradingSettings;
		expect(afterState.workspaceSettings).toEqual(testSetWorkspaceData);
	});

	it('Set current pair', () => {
		const state: ITradingSettingsStore = store.getState().tradingSettings;
		expect(state.currentPair).toBe('btc_usdt');

		const testSetCurrentPairData = 'eth_btc';

		store.dispatch(setCurrentPair(testSetCurrentPairData));
		const afterState: ITradingSettingsStore = store.getState().tradingSettings;
		expect(afterState.currentPair).toBe(testSetCurrentPairData);
	});

	it('Set current interval', () => {
		const state: ITradingSettingsStore = store.getState().tradingSettings;
		expect(state.interval).toBe('60');

		const testSetCurrentIntervalData = '30';

		store.dispatch(setCurrentInterval(testSetCurrentIntervalData));
		const afterState: ITradingSettingsStore = store.getState().tradingSettings;
		expect(afterState.interval).toBe(testSetCurrentIntervalData);
	});
});
