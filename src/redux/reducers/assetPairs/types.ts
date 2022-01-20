export interface IAssetPairsStore {
	assetPairs: IAssetPairsData;
	assetPairsLoader: boolean;
	assetPairsFeesAndLimits: IAssetPairsFeesAndLimitsData;
	assetPairsFeesAndLimitsLoader: boolean;
}

// ==========================================:
export interface IAssetPairsItem {
	active: number;
	buy_enabled: number;
	change24h: number;
	change24h_value: number;
	code: string;
	high24: number;
	id: number;
	last_price: number;
	last_price_usd: number;
	low24: number;
	sell_enabled: number;
	view_decimal: number;
	volume24h: number;
	volumeQuote24: number;
}

export type IAssetPairsData = Array<IAssetPairsItem> | null;

// ==========================================:
export interface IAssetPairsFeesAndLimitsItem {
	id: number;
	code: string;
	maker_fee: number;
	taker_fee: number;
	amount_min: number;
	amount_max: number;
}

export type IAssetPairsFeesAndLimitsData = Array<IAssetPairsFeesAndLimitsItem> | null;

// ==========================================:
export type IAssetPairsResponsePayload = IAssetPairsData;

// ==========================================:
export type IAssetPairsFeesAndLimitsResponsePayload = IAssetPairsFeesAndLimitsData;
