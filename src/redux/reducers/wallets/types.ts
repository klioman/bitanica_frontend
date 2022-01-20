export interface IWalletsStore {
	walletsList: IWalletsData;
	generateAddress: IGenerateAddressWalletData | null;
	walletsLoader: boolean;
	generateAddressLoader: boolean;
	walletsCryptoHistory: IWalletsCryptoHistoryData;
	walletsCryptoHistoryLoader: boolean;
}

// =============================================================:
export interface IWalletItem {
	id: number;
	asset: IWalletAsssetItem;
	balance: string;
	frozen_balance: string;
	total: string;
	tag: null | string;
	has_withdrawal_tag: boolean;
	btc_value: string;
	usd_value: string;
	networks: Array<IWalletNetworkItem>;
}

export interface IWalletAsssetItem {
	id: number;
	code: string;
	type: string;
	exchangeable: number;
	chain: string;
	decimals: null | number;
	name: string;
	deposit_max: number;
	deposit_min: number;
	withdraw_max: number;
	withdraw_min: number;
	exchange_min: number;
	img_path: string;
}

export interface IWalletNetworkItem {
	network_id: string;
	network_name: string;
	withdrawable: number;
	depositable: number;
	depositable_message: null | string;
	withdrawable_message: null | string;
	top_up_address: null | string;
	deposit_fee: number;
	withdraw_fee: number;
	withdraw_min: number;
	withdraw_max: number;
}

// =============================================================:
export interface IGenerateAddressWalletPayload {
	id: number;
	network: string;
}

export interface IGenerateAddressWalletData {
	address: string;
	address_qr: string;
	tag: null | string;
	coin: string;
}

// =============================================================:
export interface IWalletsCryptoHistory {
	total: number;
	per_page: string | number;
	last_page: number;
	current_page: number;
	data: Array<IWalletsCryptoHistoryItem>;
}

export interface IWalletsCryptoHistoryItem {
	id: number;
	hash: null | string;
	asset_id: number;
	network: string;
	amount: string;
	fee: string;
	address: string;
	tag: null;
	status: string;
	comment: string;
	created_at: number;
	transaction_type: string;
	user_id: number;
	asset: IWalletsCryptoHistoryAssetItem;
	asset_code: string;
	tx_url: string;
}

export interface IWalletsCryptoHistoryAssetItem {
	id: number;
	code: string;
	type: string;
	view_decimal?: number;
	depositable: number;
	withdrawable: number;
	exchangeable: number;
	depositable_message: null | string;
	withdrawable_message: null | string;
	chain: string;
	decimals: null | number;
	name: string;
	deposit_max: number;
	deposit_min: number;
	withdraw_max: number;
	withdraw_min: number;
	exchange_min: number;
	img_path: string;
}

// ==========================================:
export interface IWalletsCryptoHistoryRequestData {
	params: IWalletsCryptoHistoryRequestParamsData;
}
export interface IWalletsCryptoHistoryRequestParamsData {
	per_page?: number;
	current_page?: number;
	wallet_id?: number;
	past_days?: number;
	status?: string;
	transaction_type?: string;
	tx_id?: string;
	export?: boolean;
}

// =============================================================:
export type IWalletsData = Array<IWalletItem> | null;
export type IWalletsCryptoHistoryData = IWalletsCryptoHistory | null;

// =============================================================:
export type IWalletsResponsePayload = IWalletsData;

// =============================================================:
export type IWalletsCryptoHistoryRequestPayload = IWalletsCryptoHistoryRequestData;
export type IWalletsCryptoHistoryResponsePayload = IWalletsCryptoHistoryData;
