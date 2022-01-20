export interface IOrdersStore {
	calculate: ICalculateOrdersData;
	tempOrderPrice: number;
}

export interface ICalculateOrdersData {
	limitOrder: null | ICalculateLimitOrderData;
	marketOrder: null | ICalculateMarketOrderData;
}

export interface ICalculateLimitOrderData {
	total: string;
	commission: string;
	available_balance: string;
	type: string;
}
export interface ICalculateMarketOrderData {
	total: string;
	commission: string;
	available_balance: string;
	type: string;
}

// ================================================:
export interface ICalculateLimitOrderRequestData {
	pair_code: string;
	quantity: number;
	price: number;
	type: string;
}
// ================================================:
export interface ICalculateMarketOrderRequestData {
	pair_code: string;
	quantity: number;
	type: string;
}

// ================================================:
export interface ICreateStopLimitOrderOrderRequestData {
	pair_code: string;
	quantity: number;
	limit: number;
	stop: number;
	type: string;
}

export interface ICalculateLimitOrderResponseData {
	data: ICalculateLimitOrderData;
}

export interface ICalculateMarketOrderResponseData {
	data: ICalculateMarketOrderData;
}

// ================================================:
export interface ICreateLimitOrderResponseData {
	pair: string;
	offer_asset_id: number;
	want_asset_id: number;
	type: string;
	status: string;
	price: string;
	quantity: string;
	quantity_left: string;
	user_id: number;
	updated_at: number;
	created_at: number;
	id: number;
	total: number;
	filling: number;
}
// ================================================:
export type ICreateOrderResponseData = ICreateLimitOrderResponseData;

// ================================================:
export type ICalculateLimitOrderRequestPayload = ICalculateLimitOrderRequestData;
export type ICalculateLimitOrderResponsePayload = ICalculateLimitOrderResponseData;

// ================================================:
export type ICreateOrderRequestPayload =
	| ICalculateLimitOrderRequestData
	| ICalculateMarketOrderRequestData;
export type ICreateOrderResponsePayload = ICreateOrderResponseData;

// ================================================:
export type ICalculateMarketOrderRequestPayload = ICalculateMarketOrderRequestData;
export type ICalculateMarketOrderResponsePayload = ICalculateMarketOrderResponseData;

// ================================================:
export type ICreateStopLimitOrderRequestPayload = ICreateStopLimitOrderOrderRequestData;
export type ICreateStopLimitOrderResponsePayload = ICreateLimitOrderResponseData;
