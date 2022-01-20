import { store } from 'redux/store';
import {
	getOrderBookRequest,
	getOrderBookSuccess,
	getRecentTradesRequest,
	getRecentTradesSuccess,
	getUserTradesRequest,
	getUserTradesSuccess,
} from './reducer';
import {
	IOrderBookData,
	IOrderbookRequestData,
	IRecentTradesItem,
	IRecentTradesRequestData,
	ISpotTradeStore,
	IUserTradesData,
	IUserTradesRequestData,
} from './types';

// ================================================:
describe('Spot trade reducer:', () => {
	it('Get spot trade initial state', () => {
		const state: ISpotTradeStore = store.getState().spotTrade;

		expect(state.orderBook).toEqual(null);
		expect(state.orderBookLoader).toBeFalsy();
		expect(state.recentTrades).toEqual(null);
		expect(state.recentTradesLoader).toBeFalsy();
		expect(state.userTrades).toEqual(null);
		expect(state.userTradesLoader).toBeFalsy();
	});

	it('Get spot orderbook list request', () => {
		const state: ISpotTradeStore = store.getState().spotTrade;

		expect(state.orderBookLoader).toBeFalsy();

		const testSpotOrderBookRequestData: IOrderbookRequestData = {
			pair: 'btc_usdt',
			params: {
				limit: 100,
			},
		};

		store.dispatch(getOrderBookRequest(testSpotOrderBookRequestData));
		const afterState: ISpotTradeStore = store.getState().spotTrade;
		expect(afterState.orderBookLoader).toBeTruthy();
	});

	it('Get spot orderbook list success', () => {
		const testSpotOrderBookSuccessData: IOrderBookData = {
			ask: [
				{
					collapsed: 1,
					price: '0.0095167560',
					quantity: '2.5340000000',
					quantity_left: '2.5340000000',
					total: '0.02411546',
				},
			],
			ask_amount: 1.00317626,
			ask_quantity: 28,
			ask_top: 0.0094087,
			bid: [
				{
					collapsed: 1,
					price: '0.0093992980',
					quantity: '3.5360000000',
					quantity_left: '3.5360000000',
					total: '0.03323592',
				},
			],
			bid_amount: 2.34270412,
			bid_quantity: 47,
			bid_top: 0.0093993,
			pair: 'btc_usdt',
		};

		store.dispatch(getOrderBookSuccess(testSpotOrderBookSuccessData));
		const storeAfterRequest: ISpotTradeStore = store.getState().spotTrade;

		expect(storeAfterRequest.orderBookLoader).toBeFalsy();
		expect(storeAfterRequest.orderBook).toEqual(testSpotOrderBookSuccessData);
	});

	it('Update spot orderbook list success', () => {
		const testSpotOrderBookUpdateSuccessData: IOrderBookData = {
			ask: [
				{
					collapsed: 1,
					price: '0.0095167560',
					quantity: '2.5340000000',
					quantity_left: '2.5340000000',
					total: '0.02411546',
				},
			],
			ask_amount: 1.00317626,
			ask_quantity: 28,
			ask_top: 0.0094087,
			bid: [
				{
					collapsed: 1,
					price: '0.0093992980',
					quantity: '3.5360000000',
					quantity_left: '3.5360000000',
					total: '0.03323592',
				},
			],
			bid_amount: 2.34270412,
			bid_quantity: 47,
			bid_top: 0.0093993,
			pair: 'btc_usdt',
		};

		store.dispatch(getOrderBookSuccess(testSpotOrderBookUpdateSuccessData));
		const storeAfterRequest: ISpotTradeStore = store.getState().spotTrade;

		expect(storeAfterRequest.orderBookLoader).toBeFalsy();
		expect(storeAfterRequest.orderBook).toEqual(testSpotOrderBookUpdateSuccessData);
	});

	it('Get spot recent trades list request', () => {
		const state: ISpotTradeStore = store.getState().spotTrade;

		expect(state.recentTradesLoader).toBeFalsy();

		const testSpotRecentTradesRequestData: IRecentTradesRequestData = {
			pair: 'btc_usdt',
			params: {
				limit: 100,
			},
		};

		store.dispatch(getRecentTradesRequest(testSpotRecentTradesRequestData));
		const afterState: ISpotTradeStore = store.getState().spotTrade;
		expect(afterState.recentTradesLoader).toBeTruthy();
	});

	it('Get spot recent trades list success', () => {
		const testSpotRecentTradesSuccessData: Array<IRecentTradesItem> = [
			{
				created_at: 1638890196,
				id: 27679,
				pair: 'btc_usdt',
				price: '51617.32576500',
				quantity: '0.00232500',
				type: 'buy',
			},
		];

		store.dispatch(getRecentTradesSuccess(testSpotRecentTradesSuccessData));
		const storeAfterRequest: ISpotTradeStore = store.getState().spotTrade;

		expect(storeAfterRequest.recentTradesLoader).toBeFalsy();
		expect(storeAfterRequest.recentTrades).toEqual(testSpotRecentTradesSuccessData);
	});

	it('Update spot recent trades list success', () => {
		const testSpotRecentTradesUpdateSuccessData: Array<IRecentTradesItem> = [
			{
				created_at: 1638890196,
				id: 27679,
				pair: 'btc_usdt',
				price: '51617.32576500',
				quantity: '0.00232500',
				type: 'sell',
			},
		];

		store.dispatch(getRecentTradesSuccess(testSpotRecentTradesUpdateSuccessData));
		const storeAfterRequest: ISpotTradeStore = store.getState().spotTrade;

		expect(storeAfterRequest.recentTradesLoader).toBeFalsy();
		expect(storeAfterRequest.recentTrades).toEqual(testSpotRecentTradesUpdateSuccessData);
	});

	it('Get spot user trades list request', () => {
		const state: ISpotTradeStore = store.getState().spotTrade;

		expect(state.userTradesLoader).toBeFalsy();

		const testSpotUserTradesRequestData: IUserTradesRequestData = {
			params: {
				pair: 'btc_usdt',
				current_page: 1,
				per_page: 100,
			},
		};

		store.dispatch(getUserTradesRequest(testSpotUserTradesRequestData));
		const afterState: ISpotTradeStore = store.getState().spotTrade;
		expect(afterState.userTradesLoader).toBeTruthy();
	});

	it('Get spot user trades list success', () => {
		const testSpotUserTradesSuccessData: IUserTradesData = {
			current_page: 1,
			data: [
				{
					asset_get_change: 0.015,
					asset_get_id: 2,
					asset_sold_change: 721.20492225,
					asset_sold_id: 10,
					created_at: 1638799831,
					fee: 0,
					id: 47147,
					matching_order_id: 2372279,
					order_id: 2457857,
					pair: 'btc_usdt',
					price_filled: 48080.32815,
					price_requested: null,
					type: 'market_buy',
				},
			],
			last_page: 1,
			per_page: 100,
			total: 4,
		};
		store.dispatch(getUserTradesSuccess(testSpotUserTradesSuccessData));
		const storeAfterRequest: ISpotTradeStore = store.getState().spotTrade;

		expect(storeAfterRequest.userTradesLoader).toBeFalsy();
		expect(storeAfterRequest.userTrades).toEqual(testSpotUserTradesSuccessData);
	});
});
