import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getWalletsList } from 'redux/reducers/wallets/selectors';
import { Link } from 'react-router-dom';
import SpotAndFiatBalances from './SpotAndFiatBalances';
import SpotAndFiatSortingTable from './SpotAndFiatSortingTable';

// ==========================================:
const SpotAndFiat: FC = () => {
	const walletsList = useSelector(getWalletsList);
	const [balancesIsHide, setBalancesIsHide] = useState(true);
	const [searchCoins, setSearchCoins] = useState('');
	const [smallBalancesIsHide, setSmallBalancesIsHide] = useState(false);

	const handleSetBalancesIsHide = () => {
		setBalancesIsHide(!balancesIsHide);
	};

	const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearchCoins(value);
	};

	const handleChangeSmallBalancesIsHide = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;

		setSmallBalancesIsHide(checked);
	};

	const fiatWalletsList = useMemo(() => {
		if (!walletsList?.length) {
			return [];
		}

		const fiatWallets = walletsList.filter((wallet) => wallet.asset.type === 'fiat');

		if (smallBalancesIsHide && searchCoins) {
			return fiatWallets.filter(
				(wallet) =>
					Number(wallet.btc_value) > 0.0003 &&
					wallet.asset.code.toLowerCase().includes(searchCoins.toLowerCase()),
			);
		}

		if (smallBalancesIsHide) {
			return fiatWallets.filter((wallet) => Number(wallet.btc_value) > 0.0003);
		}

		if (searchCoins) {
			return fiatWallets.filter((wallet) =>
				wallet.asset.code.toLowerCase().includes(searchCoins.toLowerCase()),
			);
		}

		return fiatWallets;
	}, [walletsList, searchCoins, smallBalancesIsHide]);

	const cryptoWalletsList = useMemo(() => {
		if (!walletsList?.length) {
			return [];
		}

		const cryptoWallets = walletsList.filter((wallet) => wallet.asset.type !== 'fiat');

		if (smallBalancesIsHide && searchCoins) {
			return cryptoWallets.filter(
				(wallet) =>
					Number(wallet.btc_value) > 0.0003 &&
					wallet.asset.code.toLowerCase().includes(searchCoins.toLowerCase()),
			);
		}

		if (smallBalancesIsHide) {
			return cryptoWallets.filter((wallet) => Number(wallet.btc_value) > 0.0003);
		}

		if (searchCoins) {
			return cryptoWallets.filter((wallet) =>
				wallet.asset.code.toLowerCase().includes(searchCoins.toLowerCase()),
			);
		}

		return cryptoWallets;
	}, [walletsList, searchCoins, smallBalancesIsHide]);

	return (
		<>
			<div className="main-content__header">
				<h2 className="section-title">Fiat and Spot</h2>
				<button type="button" className="hide-btn" onClick={handleSetBalancesIsHide}>
					<span
						className={`hide-btn__icon text-type ${balancesIsHide ? 'icon-eye' : 'icon-eye2'}`}
					/>
					<span className="hide-btn__text">Hide Balance</span>
				</button>
				<div className="section-nav">
					<Link to="/deposit-crypto" className="button button--nav">
						Deposit
					</Link>
					<Link to="/withdraw-crypto" className="button button--third-grey button--nav">
						Withdraw
					</Link>
					<Link to="/transaction-history" className="link link--second-type">
						Deposit Withdraw History
					</Link>
				</div>
			</div>
			<SpotAndFiatBalances balancesIsHide={balancesIsHide} />
			<div className="content-block">
				<div className="balance-section">
					<div className="balance-section__header">
						<div className="search search--big">
							<div className="input input--margin-none">
								<div className="input-wrapper">
									<input
										className="input-item input-item--sort input-item--right-icon"
										type="text"
										placeholder="Search Coin"
										value={searchCoins}
										onChange={handleChangeSearch}
									/>
									<button type="button" className="search-btn">
										<span className="search-btn__icon icon-search-normal" />
									</button>
								</div>
							</div>
						</div>
						<div className="checkbox checkbox--margin-none">
							<label className="checkbox__label">
								<input
									type="checkbox"
									className="hidden"
									checked={smallBalancesIsHide}
									onChange={handleChangeSmallBalancesIsHide}
								/>
								<span className=" checkbox__item">
									<span className="checkbox__item-icon">
										<span className="icon-Checkbox" />
									</span>
								</span>
								<span className="checkbox__text checkbox__text--grey">Hide Small Balances</span>
							</label>
						</div>
					</div>
					<div className="balance-block">
						<span className="balance-block__name">Fiat Balance</span>
						<SpotAndFiatSortingTable data={fiatWalletsList} balancesIsHide={balancesIsHide} />

						<div className="balance-block">
							<span className="balance-block__name">Crypto Balance</span>

							<SpotAndFiatSortingTable data={cryptoWalletsList} balancesIsHide={balancesIsHide} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SpotAndFiat;
