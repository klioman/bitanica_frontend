import { FC, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getWalletsAddress, getWalletsList } from 'redux/reducers/wallets/selectors';
import { IWalletItem, IWalletNetworkItem } from 'redux/reducers/wallets/types';
import { clearWalletAddress, getGenerateAddressRequest } from 'redux/reducers/wallets/reducer';
import DCDropdown from 'ui/DCDropdown';
import DCNDropdown from 'ui/DCNDropdown';
import { IStateDepositLocation } from './types';

// ==========================================:
const CreateDepositCrypto: FC = () => {
	const { state } = useLocation<IStateDepositLocation>();

	const [copyAddressStatus, setAddressCopyStatus] = useState({ copied: false });
	const [copyMemoStatus, setMemoCopyStatus] = useState({ copied: false });
	const [selectWallet, setSelectWallet] = useState<IWalletItem | null>(
		state?.currentWallet || null,
	);
	const [walletNetworks, setWalletNetworks] = useState<Array<IWalletNetworkItem> | null>(
		state?.currentWallet?.networks || null,
	);
	const [selectWalletNetworks, setSelectWalletNetworks] = useState<IWalletNetworkItem | null>(null);

	const dispatch = useDispatch();
	const history = useHistory();
	const walletsAddress = useSelector(getWalletsAddress);

	const walletsList = useSelector(getWalletsList);

	const cryptoWalletsList = useMemo(
		() => (walletsList?.length ? walletsList.filter((wallet) => wallet.asset.type !== 'fiat') : []),
		[walletsList],
	);

	let closeCopyMessage: ReturnType<typeof setTimeout>;

	const handleWalletSelect = (value: IWalletItem): void => {
		dispatch(clearWalletAddress());
		setSelectWallet(value);
		setSelectWalletNetworks(null);
		setWalletNetworks(value?.networks);
	};

	const handleNetworkSelect = (value: IWalletNetworkItem) => {
		setSelectWalletNetworks(value);

		const walletData = {
			id: Number(selectWallet?.id),
			network: String(value?.network_id),
		};

		dispatch(getGenerateAddressRequest(walletData));
	};

	const handleAddressCopy = () => {
		setAddressCopyStatus({ copied: true });

		closeCopyMessage = setTimeout(() => {
			setAddressCopyStatus({ copied: false });
		}, 2000);
	};

	const handleMemoCopy = () => {
		setMemoCopyStatus({ copied: true });

		closeCopyMessage = setTimeout(() => {
			setMemoCopyStatus({ copied: false });
		}, 2000);
	};

	const depositClose = () => {
		dispatch(clearWalletAddress());
		history.push('/fiat-and-spot');
	};

	useEffect(() => clearTimeout(closeCopyMessage));

	return (
		<div className="content-block content-block--flex content-block--padding-none content-block--border">
			<div className="create-offer">
				<div className="create-offer__header">
					<button type="button" onClick={depositClose} className="back-step">
						<div className="back-step__img">
							<span className="back-step__arrow icon-arrow" />
						</div>
						<span className="back-step__text">
							{String(L.translate('DepositCrypto.deposit_crypto_page_title'))}
						</span>
					</button>
					<a href="/" className="back-step back-step--next">
						<span className="back-step__text">Deposit fiat</span>
						<div className="back-step__img">
							<span className="back-step__arrow icon-arrow" />
						</div>
					</a>
				</div>
				<div className="create-offer__main create-offer__main--border-none create-offer__main--padding-big">
					<div className="create-offer__form">
						<div className="form-block">
							<div className="enter-value">
								<span className="block-label block-label--grey">Select coin</span>
								<span className="enter-value__label enter-value__label--padding">Сoin</span>
								<div className="enter-value__field">
									<DCDropdown
										value={selectWallet}
										onChange={handleWalletSelect}
										options={cryptoWalletsList}
									/>
								</div>
							</div>
						</div>
						<div className="form-block">
							<div className="enter-value">
								<span className="block-label block-label--grey">Deposit to</span>
								<span className="enter-value__label enter-value__label--padding">Network</span>
								<div className="enter-value__field">
									<DCNDropdown
										value={selectWalletNetworks}
										onChange={handleNetworkSelect}
										options={walletNetworks}
									/>
								</div>
							</div>
						</div>
						{walletsAddress && (
							<>
								<div className="form-block">
									<span className="enter-value__label enter-value__label--padding">Address</span>
									<div className="enter-value__field enter-value__field--column">
										{copyAddressStatus?.copied ? (
											<>
												<div className="address-copy-wrapper">
													<p className="address-copy-text">Address copied successfully!</p>
												</div>
											</>
										) : (
											<span className="enter-value__text">{walletsAddress?.address}</span>
										)}
										<CopyToClipboard text={walletsAddress?.address} onCopy={handleAddressCopy}>
											<button type="button" className="copy-btn">
												<span className="copy-btn__icon icon-fi_copy" />
												<span className="copy-btn__text">Click to copy address</span>
											</button>
										</CopyToClipboard>
									</div>
								</div>
								<div className="qr-code">
									<div className="qr-code__img qr-code__img--big">
										<img src={walletsAddress?.address_qr} alt="" width="182" height="182" />
									</div>
									<div className="qr-code__main qr-code__main--gap">
										{walletsAddress?.tag && (
											<>
												<div className="qr-code__info">
													<span className="qr-code__info-title">MEMO</span>
													<span className="qr-code__info-desc qr-code__info-desc--big">
														{copyMemoStatus?.copied ? (
															<>
																<div className="address-copy-wrapper">
																	<p className="address-copy-text">MEMO copied successfully!</p>
																</div>
															</>
														) : (
															<>{walletsAddress?.tag}</>
														)}
														<CopyToClipboard text={walletsAddress?.tag} onCopy={handleMemoCopy}>
															<button type="button" className="copy-btn copy-btn--small">
																<span className="copy-btn__icon icon-fi_copy" />
															</button>
														</CopyToClipboard>
													</span>
												</div>
												<div className="input-notify input-notify--second-type">
													<span className="input-notify__char icon-info-circle" />
													<span className="input-notify__text">
														MEMO is required, or you will lose your coins
													</span>
												</div>
											</>
										)}
										<div className="qr-code__info">
											<span className="qr-code__info-title">Minimum deposit</span>
											<span className="qr-code__info-desc">0.00000001</span>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateDepositCrypto;
