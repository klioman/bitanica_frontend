import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getWalletsList } from 'redux/reducers/wallets/selectors';
import { IWalletItem } from 'redux/reducers/wallets/types';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { numberFormat } from 'services/utils/numberFormat';
import { ISpotAndFiatBalancesProps } from './types';

// ================================================:
const SpotAndFiatBalances: FC<ISpotAndFiatBalancesProps> = ({ balancesIsHide }) => {
	const walletsList = useSelector(getWalletsList);

	const fiatAndSpotTotalBalanceInBTC = useMemo(() => {
		return walletsList?.length
			? walletsList.reduce((acc: number, wallet: IWalletItem) => acc + Number(wallet.btc_value), 0)
			: 0;
	}, [walletsList]);

	const fiatAndSpotTotalBalanceInUSD = useMemo(() => {
		return walletsList?.length
			? walletsList.reduce((acc: number, wallet: IWalletItem) => acc + Number(wallet.usd_value), 0)
			: 0;
	}, [walletsList]);

	const spotTotalBalanceInBTC = useMemo(() => {
		return walletsList?.length
			? walletsList
					.filter((wallet) => wallet.asset.type !== 'fiat')
					.reduce((acc: number, wallet: IWalletItem) => acc + Number(wallet.btc_value), 0)
			: 0;
	}, [walletsList]);

	const spotTotalBalanceInUSD = useMemo(() => {
		return walletsList?.length
			? walletsList
					.filter((wallet) => wallet.asset.type !== 'fiat')
					.reduce((acc: number, wallet: IWalletItem) => acc + Number(wallet.usd_value), 0)
			: 0;
	}, [walletsList]);

	const fiatTotalBalanceInBTC = useMemo(() => {
		return walletsList?.length
			? walletsList
					.filter((wallet) => wallet.asset.type === 'fiat')
					.reduce((acc: number, wallet: IWalletItem) => acc + Number(wallet.btc_value), 0)
			: 0;
	}, [walletsList]);

	const fiatTotalBalanceInUSD = useMemo(() => {
		return walletsList?.length
			? walletsList
					.filter((wallet) => wallet.asset.type === 'fiat')
					.reduce((acc: number, wallet: IWalletItem) => acc + Number(wallet.usd_value), 0)
			: 0;
	}, [walletsList]);

	return (
		<div className="content-block">
			<div className="balance-list">
				<div className="balance-item">
					<span className="balance-item__title">Fiat and Spot balance</span>
					<span className="balance-item__value">
						<span className="balance-item__value-num">
							{balancesIsHide ? '********' : fixedCropNumber(fiatAndSpotTotalBalanceInBTC, 8)}
						</span>{' '}
						{balancesIsHide ? '' : 'BTC'} <br />
						{balancesIsHide
							? '********'
							: `≈ $ ${numberFormat(fiatAndSpotTotalBalanceInUSD, 'en-EN')}`}
					</span>
				</div>
				<div className="balance-item">
					<span className="balance-item__title">Spot balance</span>
					<span className="balance-item__value">
						<span className="balance-item__value-num">
							{balancesIsHide ? '********' : fixedCropNumber(spotTotalBalanceInBTC, 8)}
						</span>{' '}
						{balancesIsHide ? '' : 'BTC'} <br />
						{balancesIsHide ? '********' : `≈ $ ${numberFormat(spotTotalBalanceInUSD, 'en-EN')}`}
					</span>
				</div>
				<div className="balance-item">
					<span className="balance-item__title">Fiat balance</span>
					<span className="balance-item__value">
						<span className="balance-item__value-num">
							{balancesIsHide ? '********' : fixedCropNumber(fiatTotalBalanceInBTC, 8)}
						</span>{' '}
						{balancesIsHide ? '' : 'BTC'} <br />
						{balancesIsHide ? '********' : `≈ $ ${numberFormat(fiatTotalBalanceInUSD, 'en-EN')}`}
					</span>
				</div>
			</div>
		</div>
	);
};

export default SpotAndFiatBalances;
