import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getAssetPairsList } from 'redux/reducers/assetPairs/selectors';
import { setCurrentPair } from 'redux/reducers/tradingSettings/reducer';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { numberFormat } from 'services/utils/numberFormat';
import { ISpotAndFiatItemProps } from './types';

const SpotAndFiatItem: FC<ISpotAndFiatItemProps> = ({ data, balancesIsHide }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const assetPairs = useSelector(getAssetPairsList);
	const currentPair = useSelector(getCurrentPair);

	const isDepositable = useMemo(() => {
		return data?.networks?.length ? data.networks.some((network) => network.depositable) : false;
	}, [data]);
	const isWithdrawable = useMemo(() => {
		return data?.networks?.length ? data.networks.some((network) => network.withdrawable) : false;
	}, [data]);

	const handleTrade = () => {
		const findPairPerCode = assetPairs?.length
			? assetPairs.find((pair) => pair.code === `${data?.asset?.code}_usdt`)
			: null;

		if (findPairPerCode?.code) {
			dispatch(setCurrentPair(findPairPerCode?.code));
		} else {
			dispatch(setCurrentPair('btc_usdt'));
		}

		history.push(`/spot/${currentPair.toUpperCase()}`);
	};

	return (
		<div className="tr">
			<div className="td">
				<div className="balance-currency">
					<div className="balance-currency__img">
						<img src={data?.asset?.img_path} alt="" />
					</div>
					<div className="balance-currency__info">
						<span className="balance-currency__title">{data?.asset?.code?.toUpperCase()}</span>
						<span className="balance-currency__desc">{data?.asset?.name}</span>
					</div>
				</div>
			</div>
			<div className="td">
				<span className="td-name td-name--regular">
					{balancesIsHide ? '********' : data?.total}
				</span>
			</div>
			<div className="td">
				<span className="td-name td-name--regular">
					{balancesIsHide ? '********' : data?.balance}
				</span>
			</div>
			<div className="td">
				<span className="td-name td-name--regular">
					{balancesIsHide ? '********' : data?.frozen_balance}
				</span>
			</div>
			<div className="td">
				<span className="td-name td-name--regular">
					{balancesIsHide ? '********' : data?.btc_value}{' '}
				</span>
				<span className="td-name td-name--subtext">
					{' '}
					≈ $ {balancesIsHide ? '********' : numberFormat(Number(data?.usd_value), 'en-EN')}
				</span>
			</div>
			<div className="td">
				<div className="link-group">
					<a href="/" className="link link--regular">
						Buy
					</a>

					{isDepositable ? (
						<Link
							to={{
								pathname: '/deposit-crypto',
								state: {
									currentWallet: data,
								},
							}}
							className="link link--regular"
						>
							Deposit
						</Link>
					) : null}

					{isWithdrawable ? (
						<Link
							to={{
								pathname: '/withdraw-crypto',
								state: {
									currentWallet: data,
								},
							}}
							className="link link--regular"
						>
							Withdraw
						</Link>
					) : null}

					{data?.asset?.type !== 'fiat' ? (
						<button type="button" onClick={handleTrade} className="link link--regular">
							Trade
						</button>
					) : null}

					<Link to="/convert" className="link link--regular">
						Convert
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SpotAndFiatItem;
