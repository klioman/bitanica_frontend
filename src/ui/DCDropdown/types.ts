import { IWalletItem, IWalletsData } from 'redux/reducers/wallets/types';

// ==================================:
export interface IDCDropdown {
	placeholder?: string;
	value: IWalletItem | null;
	onChange: (selectedValue: IWalletItem) => void;
	options: IWalletsData;
}
