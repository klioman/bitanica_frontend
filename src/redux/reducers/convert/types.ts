export interface IConvertStore {
	exchangeRate: null | IExchangeRateData;
	exchangeRateLoader: boolean;
	makeExchangeLoader: boolean;
}

// =============================================================:
export interface IExchangeRateData {
	rate: string;
}

// =============================================================:
export interface IExchangeRateRequestData {
	from_asset_id: number;
	to_asset_id: number;
}

// =============================================================:
export interface ICreateExchangeRequestData {
	from_asset_id: number;
	to_asset_id: number;
	quantity: number;
}

// =============================================================:
export type IExchangeRateRequestPayload = IExchangeRateRequestData;
export type IExchangeRateResponsePayload = IExchangeRateData;

// =============================================================:
export type ICreateExchangeRequestPayload = ICreateExchangeRequestData;
