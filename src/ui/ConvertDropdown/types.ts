import { IWalletItem, IWalletsData } from 'redux/reducers/wallets/types';

// ==================================:
export interface IConvertDropdownProps {
	value: IWalletItem | null;
	onChange: (selectedValue: IWalletItem) => void;
	options: IWalletsData;
}
