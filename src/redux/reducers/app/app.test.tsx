import { store } from 'redux/store';
import { changeAppLanguage, mobileMenu } from './reducer';
import { IAppStore } from './types';

// ================================================:
describe('App reducer:', () => {
	it('Mobile menu:', () => {
		const state: IAppStore = store.getState().app;
		expect(state.mobileMenu).toBeFalsy();

		store.dispatch(mobileMenu({ open: true }));
		const afterState: IAppStore = store.getState().app;
		expect(afterState.mobileMenu).toBeTruthy();
	});

	it('App current lang:', () => {
		const state: IAppStore = store.getState().app;
		expect(state.lang).toBe('EN');

		store.dispatch(changeAppLanguage('RU'));
		const afterState: IAppStore = store.getState().app;
		expect(afterState.lang).toBe('RU');
	});
});
