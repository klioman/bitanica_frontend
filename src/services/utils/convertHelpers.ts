import { IAssetPairsData } from 'redux/reducers/assetPairs/types';
import { IWalletItem, IWalletsData } from 'redux/reducers/wallets/types';

export const convertWalletsFiltered = (
	walletsData: IWalletsData,
	assetPairsData: IAssetPairsData,
	selectWalletData: IWalletItem | null,
): IWalletsData => {
	return walletsData?.length
		? walletsData?.filter(
				(wallet) =>
					wallet.id !== selectWalletData?.id &&
					assetPairsData?.some(
						(el) =>
							(wallet?.asset?.code === el?.code?.split('_')[0] ||
								wallet?.asset?.code === el?.code?.split('_')[1]) &&
							(el?.code?.split('_')[0] === selectWalletData?.asset?.code ||
								el?.code?.split('_')[1] === selectWalletData?.asset?.code),
					),
		  )
		: [];
};
