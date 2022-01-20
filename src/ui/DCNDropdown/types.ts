import { IWalletNetworkItem } from 'redux/reducers/wallets/types';

// ==================================:
export interface IDCNDropdown {
	placeholder?: string;
	value: IWalletNetworkItem | null;
	onChange: (selectedValue: IWalletNetworkItem) => void;
	options: Array<IWalletNetworkItem> | null;
}
