export interface ISpotTradeStore {
	orderBook: IOrderBookData | null;
	orderBookLoader: boolean;
	recentTrades: Array<IRecentTradesItem> | null;
	recentTradesLoader: boolean;
	userTrades: IUserTradesData | null;
	userTradesLoader: boolean;
	tablesHistory: ITablesHistoryData;
}

// ==========================================:
export interface IOrderBookData {
	pair: string;
	ask: Array<IOrderBookAskData>;
	bid: Array<IOrderBookBidData>;
	ask_quantity: number;
	ask_amount: number;
	ask_top: number;
	bid_quantity: number;
	bid_amount: number;
	bid_top: number;
}

export interface IOrderBookAskData {
	collapsed: number;
	price: string;
	quantity: string;
	quantity_left: string;
	total: string;
}
export interface IOrderBookBidData {
	collapsed: number;
	price: string;
	quantity: string;
	quantity_left: string;
	total: string;
}

// ==========================================:
export interface IRecentTradesItem {
	id: number;
	pair: string;
	quantity: string;
	price: string;
	type: string;
	created_at: number;
}

// ==========================================:
export interface IUserTradesData {
	total: number;
	per_page: number;
	last_page: number;
	current_page: number;
	data: Array<IUserTradesItem>;
}
// ==========================================:
export interface IUserTradesItem {
	id: number;
	order_id: number;
	matching_order_id: number;
	pair: string;
	type: string;
	price_requested: number | null;
	price_filled: number;
	asset_sold_id: number;
	asset_sold_change: number;
	asset_get_id: number;
	asset_get_change: number;
	fee: number;
	created_at: number;
}

// ==========================================:
export interface ITablesHistoryData {
	openOrders: null | IOpenOrdersData;
	openOrdersLoader: boolean;
	ordersHistory: null | IOrdersHistoryData;
	ordersHistoryLoader: boolean;
}

export interface IOpenOrdersData {
	total: number;
	per_page: number;
	last_page: number;
	current_page: number;
	data: Array<IOpenOrdersItemData>;
}
export interface IOpenOrdersItemData {
	id: number;
	user_id: number;
	type: string;
	pair: string;
	want_asset_id: number;
	offer_asset_id: number;
	filled: null | number | string;
	price: string;
	quantity: string;
	quantity_left: string;
	status: null | string;
	average: null | number | string;
	trigger_conditions: null | number | string;
	updated_at: number;
	created_at: number;
	total: number;
	filling: null | number | string;
}

export interface IOpenOrdersUpdateData {
	orders: Array<IOpenOrdersItemData>;
}

// ==========================================:
export interface IOrdersHistoryData {
	total: number;
	per_page: number;
	last_page: number;
	current_page: number;
	data: Array<IOrdersHistoryItemData>;
}
export interface IOrdersHistoryItemData {
	id: number;
	user_id: number;
	type: string;
	pair: string;
	want_asset_id: number;
	offer_asset_id: number;
	price: string;
	quantity: string;
	quantity_left: string;
	status: null | string;
	average: null | number | string;
	updated_at: number;
	created_at: number;
	total: number;
	filling: null | number | string;
}

export interface IOrdersHistoryUpdateData {
	orders: Array<IOrdersHistoryItemData>;
}
// ==========================================:
export type ITradesHistoryItemData = IUserTradesItem;

// ==========================================:
export interface IOrderbookRequestData {
	pair: string;
	params: IOrderbookRequestParamsData;
}
export interface IOrderbookRequestParamsData {
	limit: number;
}

// ==========================================:
export interface IRecentTradesRequestData {
	pair: string;
	params: IRecentTradesRequestParamsData;
}
export interface IRecentTradesRequestParamsData {
	limit: number;
}

// ==========================================:
export interface IUserTradesRequestData {
	params: IUserTradesRequestParamsData;
}
export interface IUserTradesRequestParamsData {
	pair?: string;
	current_page: number;
	per_page: number;
	period?: null | number;
	start_date?: string;
	end_date?: string;
}

// ==========================================:
export interface IOpenOrdersRequestData {
	params: IOpenOrdersRequestParamsData;
}
export interface IOpenOrdersRequestParamsData {
	per_page: number;
}

// ==========================================:
export interface IOrdersHistoryRequestData {
	params: IOrdersHistoryRequestParamsData;
}
export interface IOrdersHistoryRequestParamsData {
	per_page: number;
	period?: null | number;
	start_date?: string;
	end_date?: string;
	pair?: string;
	side?: string;
}

// ==========================================:
export interface IRemoveOpenOrderRequestData {
	id: number;
}
export interface IRemoveAllOpenOrdersRequestData {
	asset_pair_code: string;
}

// ==========================================:
export type IOrderbookRequestPayload = IOrderbookRequestData;
export type IOrderbookResponsePayload = IOrderBookData;

// ==========================================:
export type IRecentTradesRequestPayload = IRecentTradesRequestData;
export type IRecentTradesResponsePayload = Array<IRecentTradesItem>;

// ==========================================:
export type IUserTradesRequestPayload = IUserTradesRequestData;
export type IUserTradesResponsePayload = IUserTradesData;

// ==========================================:
export type IOpenOrdersRequestPayload = IOpenOrdersRequestData;
export type IOpenOrdersResponsePayload = IOpenOrdersData;
export type IOpenOrdersUpdateResponseDataPayload = IOpenOrdersUpdateData;

// ==========================================:
export type IOrdersHistoryRequestPayload = IOrdersHistoryRequestData;
export type IOrdersHistoryResponsePayload = IOrdersHistoryData;
export type IOrdersHistoryUpdateResponseDataPayload = IOrdersHistoryUpdateData;

// ==========================================:
export type IRemoveOpenOrderRequestPayload = IRemoveOpenOrderRequestData;
export type IRemoveAllOpenOrdersRequestPayload = IRemoveAllOpenOrdersRequestData | null;
