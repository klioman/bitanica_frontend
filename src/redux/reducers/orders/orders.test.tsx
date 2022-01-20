import { store } from 'redux/store';
import {
	calculateLimitOrderRequest,
	calculateLimitOrderSuccess,
	calculateMarketOrderRequest,
	calculateMarketOrderSuccess,
	ordersInitState,
} from './reducer';
import {
	ICalculateLimitOrderRequestData,
	ICalculateMarketOrderRequestPayload,
	IOrdersStore,
} from './types';

// ================================================:
describe('Orders reducer:', () => {
	it('Get orders initial state', () => {
		store.dispatch(ordersInitState());

		const state: IOrdersStore = store.getState().orders;

		expect(state.calculate.limitOrder).toEqual(null);
		expect(state.calculate.marketOrder).toEqual(null);
		expect(state.tempOrderPrice).toBe(0);
	});

	it('Calculate limit order request', () => {
		const state: IOrdersStore = store.getState().orders;

		expect(state.calculate.limitOrder).toEqual(null);

		const testCalculateLimitOrderRequestData: ICalculateLimitOrderRequestData = {
			pair_code: 'btc_usdt',
			quantity: 1,
			price: 50000,
			type: 'buy',
		};

		store.dispatch(calculateLimitOrderRequest(testCalculateLimitOrderRequestData));
		const afterState: IOrdersStore = store.getState().orders;

		expect(afterState.calculate.limitOrder).toEqual(null);
	});

	it('Calculate limit order success', () => {
		const testCalculateLimitOrderSuccessData = {
			data: {
				total: '390000000',
				commission: '0',
				available_balance: '-390000000',
				type: 'buy',
			},
		};

		store.dispatch(calculateLimitOrderSuccess(testCalculateLimitOrderSuccessData));
		const storeAfterRequest: IOrdersStore = store.getState().orders;

		expect(storeAfterRequest.calculate.limitOrder).toEqual(testCalculateLimitOrderSuccessData.data);
	});

	it('Calculate market order request', () => {
		const state: IOrdersStore = store.getState().orders;

		expect(state.calculate.marketOrder).toEqual(null);

		const testCalculateMarketOrderRequestData: ICalculateMarketOrderRequestPayload = {
			pair_code: 'btc_usdt',
			quantity: 1,
			type: 'market_buy',
		};

		store.dispatch(calculateMarketOrderRequest(testCalculateMarketOrderRequestData));
		const afterState: IOrdersStore = store.getState().orders;

		expect(afterState.calculate.marketOrder).toEqual(null);
	});

	it('Calculate market order success', () => {
		const testCalculateMarketOrderSuccessData = {
			data: {
				total: '390000000',
				commission: '0',
				available_balance: '-390000000',
				type: 'market_buy',
			},
		};

		store.dispatch(calculateMarketOrderSuccess(testCalculateMarketOrderSuccessData));
		const storeAfterRequest: IOrdersStore = store.getState().orders;

		expect(storeAfterRequest.calculate.marketOrder).toEqual(
			testCalculateMarketOrderSuccessData.data,
		);
	});
});
