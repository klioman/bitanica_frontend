export interface IAssetsStore {
	assetsList: IAssetsData;
	assetsLoader: boolean;
}

export interface IAssetsItem {
	id: number;
	code: string;
	type: string;
	depositable: number;
	withdrawable: number;
	exchangeable: number;
	depositable_message: null | string;
	withdrawable_message: null | string;
	chain: string;
	decimals: null;
	name: string;
	deposit_max: number;
	deposit_min: number;
	withdraw_max: number;
	withdraw_min: number;
	exchange_min: number;
	img_path: string;
}

export type IAssetsData = Array<IAssetsItem> | null;

export type IAssetsResponsePayload = IAssetsData;
