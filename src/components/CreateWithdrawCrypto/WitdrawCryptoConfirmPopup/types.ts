import { IWalletItem, IWalletNetworkItem } from 'redux/reducers/wallets/types';

export interface IWitdrawCryptoConfirmPopupProps {
	openModal: boolean;
	closeModal: () => void;
	recieveAmount: number;
	amount: number;
	address: string;
	currentWallet: IWalletItem;
	currentWalletNetwork: IWalletNetworkItem;
}
