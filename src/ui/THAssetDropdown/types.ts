import { IWalletItem } from 'redux/reducers/wallets/types';

// ==================================:
export interface ITHAssetDropdownProps {
	placeholder?: string;
	value: IWalletItem | string;
	onChange: (selectedValue: IWalletItem | string) => void;
	options: Array<IWalletItem> | null;
}
