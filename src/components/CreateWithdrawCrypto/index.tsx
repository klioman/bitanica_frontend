import { ChangeEvent, FC, memo, useEffect, useMemo, useState } from 'react';
import L from 'i18n-react';
import { Link, useLocation } from 'react-router-dom';
import DCDropdown from 'ui/DCDropdown';
import { IWalletItem, IWalletNetworkItem } from 'redux/reducers/wallets/types';
import { getWalletsList } from 'redux/reducers/wallets/selectors';
import { useDispatch, useSelector } from 'react-redux';
import DCNDropdown from 'ui/DCNDropdown';
import { checkWithdrawalAddressRequest } from 'redux/reducers/withdrawCrypto/reducer';
import { ICheckWithdrawalAddressRequestData } from 'redux/reducers/withdrawCrypto/types';
import {
	getToWithdrawalAddressIsValid,
	getСheckWithdrawalAddressLoader,
} from 'redux/reducers/withdrawCrypto/selectors';
import TextError from 'ui/Formik/TextError';
import { DebounceInput } from 'react-debounce-input';
import { numberValidation } from 'services/utils/numberValidation';
import { userSettingsRequest } from 'redux/reducers/settings/reducer';
import WitdrawCryptoConfirmPopup from './WitdrawCryptoConfirmPopup';
import { IStateWithdrawLocation } from './types';

const CreateWithdrawCrypto: FC = () => {
	const { state } = useLocation<IStateWithdrawLocation>();

	const [selectWallet, setSelectWallet] = useState<IWalletItem | null>(
		state?.currentWallet || null,
	);
	const [walletNetworks, setWalletNetworks] = useState<Array<IWalletNetworkItem> | null>(
		state?.currentWallet?.networks || null,
	);
	const [selectWalletNetworks, setSelectWalletNetworks] = useState<IWalletNetworkItem | null>(null);
	const [walletAddressTo, setWalletAddressTo] = useState('');
	const [amount, setAmount] = useState('');

	const [visibleWithdrawalInfo, setVisibleWithdrawalInfo] = useState(false);

	const [openModal, setOpenModal] = useState(false);
	const closeModal = () => setOpenModal(false);

	const dispatch = useDispatch();

	const walletsList = useSelector(getWalletsList);
	const walletAddressToIsValid = useSelector(getToWithdrawalAddressIsValid);
	const checkWithdrawalAddressLoader = useSelector(getСheckWithdrawalAddressLoader);

	const cryptoWalletsList = useMemo(
		() => (walletsList?.length ? walletsList.filter((wallet) => wallet.asset.type !== 'fiat') : []),
		[walletsList],
	);

	useEffect(() => {
		dispatch(userSettingsRequest());
	}, [dispatch]);

	const handleWalletSelect = (value: IWalletItem): void => {
		setSelectWallet(value);
		setSelectWalletNetworks(null);
		setWalletNetworks(value?.networks);
		setWalletAddressTo('');
		setAmount('');
	};

	const handleNetworkSelect = (value: IWalletNetworkItem) => {
		setSelectWalletNetworks(value);
		setWalletAddressTo('');
		setAmount('');
	};

	const handleWalletAddressToChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (selectWallet?.asset?.code && value.trim() && selectWalletNetworks?.network_id) {
			const requestData: ICheckWithdrawalAddressRequestData = {
				asset_code: selectWallet?.asset?.code,
				address: value.trim(),
				network: selectWalletNetworks?.network_id,
			};

			dispatch(checkWithdrawalAddressRequest(requestData));
		}

		setWalletAddressTo(value);
	};

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (numberValidation(value)) {
			setAmount(value);
		}
	};

	const handleClickWithdrawalMax = () => {
		if (selectWalletNetworks?.withdraw_max && selectWallet?.balance) {
			setAmount(
				String(
					Number(selectWallet?.balance) > Number(selectWalletNetworks?.withdraw_max)
						? selectWalletNetworks?.withdraw_max
						: selectWallet?.balance,
				),
			);
		}
	};

	const getRecieveAmount = (): number => {
		if (
			amount &&
			selectWalletNetworks?.withdraw_fee &&
			Number(amount) > Number(selectWalletNetworks?.withdraw_fee)
		) {
			return Number(amount) - Number(selectWalletNetworks?.withdraw_fee);
		}

		return Number(amount);
	};

	const recieveAmount = getRecieveAmount();

	const isInvalidFormatAddressChecked = walletAddressTo && !walletAddressToIsValid;
	const isInvalidAmountMinWithdrawalChecked =
		amount &&
		selectWalletNetworks?.withdraw_min &&
		Number(selectWalletNetworks?.withdraw_fee) < Number(selectWalletNetworks?.withdraw_min) &&
		Number(amount) < Number(selectWalletNetworks?.withdraw_min);

	const isAmountLessBalance =
		amount && selectWallet?.balance && Number(amount) > Number(selectWallet?.balance);

	const withdrawalToIsVisible = selectWallet;
	const withdrawalInfoIsVisible =
		selectWallet && selectWalletNetworks && walletAddressTo && !isInvalidFormatAddressChecked;
	const receiveAmountIsVisible =
		selectWallet &&
		selectWalletNetworks &&
		walletAddressTo &&
		amount &&
		visibleWithdrawalInfo &&
		!isInvalidAmountMinWithdrawalChecked &&
		!isAmountLessBalance;

	const withdrawIsDisable =
		isInvalidFormatAddressChecked ||
		isInvalidAmountMinWithdrawalChecked ||
		!withdrawalToIsVisible ||
		!withdrawalInfoIsVisible ||
		!receiveAmountIsVisible ||
		!!isAmountLessBalance;

	useEffect(() => {
		if (!checkWithdrawalAddressLoader) {
			setVisibleWithdrawalInfo(!!withdrawalInfoIsVisible);
		}
	}, [withdrawalInfoIsVisible, checkWithdrawalAddressLoader]);

	return (
		<div className="content-block content-block--flex content-block--padding-none content-block--border">
			<div className="create-offer">
				<div className="create-offer__header">
					<Link to="/fiat-and-spot" className="back-step">
						<div className="back-step__img">
							<span className="back-step__arrow icon-arrow" />
						</div>
						<span className="back-step__text">
							{String(L.translate('WithdrawCrypto.withdraw_crypto_page_title'))}
						</span>
					</Link>
					<a href="/" className="back-step back-step--next">
						<span className="back-step__text">Withdraw fiat</span>
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
						{withdrawalToIsVisible ? (
							<div className="form-block">
								<div className="enter-value">
									<span className="block-label block-label--grey">1. Withdraw to</span>

									<div className="enter-value__group">
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
							</div>
						) : null}
						{selectWalletNetworks ? (
							<div className="crypto-stats">
								<div className="crypto-stats__side">
									<span className="crypto-stats__title">
										{selectWallet?.asset?.code?.toUpperCase()} spot balance
									</span>
									<span className="crypto-stats__desc">
										{selectWallet?.balance} {selectWallet?.asset?.code?.toUpperCase()}
									</span>
								</div>
								<div className="crypto-stats__side">
									<span className="crypto-stats__title">Minimum withdrawal</span>
									<span className="crypto-stats__desc">
										{selectWalletNetworks?.withdraw_min} {selectWallet?.asset?.code?.toUpperCase()}
									</span>
								</div>
								<div className="crypto-stats__side">
									<span className="crypto-stats__title">Network fee</span>
									<span className="crypto-stats__desc">
										{selectWalletNetworks?.withdraw_fee} {selectWallet?.asset?.code?.toUpperCase()}
									</span>
								</div>
							</div>
						) : null}

						{selectWalletNetworks && selectWallet ? (
							<div className="form-block">
								<div className="enter-value">
									<div className="enter-value__group">
										<span className="enter-value__label enter-value__label--padding">Address</span>
										<div
											className={`enter-value__field ${
												isInvalidFormatAddressChecked ? 'enter-value__field--error' : ''
											}`}
										>
											<DebounceInput
												debounceTimeout={200}
												type="text"
												placeholder="Enter address here"
												className={`input-item ${
													isInvalidFormatAddressChecked ? 'input-item--error' : ''
												}`}
												name="address"
												value={walletAddressTo}
												onChange={handleWalletAddressToChange}
											/>
										</div>
									</div>
									{isInvalidFormatAddressChecked ? (
										<TextError>Invalid format address!</TextError>
									) : null}
								</div>
							</div>
						) : null}

						{visibleWithdrawalInfo ? (
							<div className="form-block form-block--padding">
								<div className="enter-value">
									<span className="block-label block-label--grey">2. Withdrawal info</span>
									<div className="enter-value__group">
										<span className="enter-value__label enter-value__label--padding">Amount</span>
										<div
											className={`enter-value__field ${
												isInvalidAmountMinWithdrawalChecked || isAmountLessBalance
													? 'enter-value__field--error'
													: ''
											}`}
										>
											<input
												className={`input-item input-item--right-icon-and-action ${
													isInvalidAmountMinWithdrawalChecked || isAmountLessBalance
														? 'input-item--error'
														: ''
												}`}
												type="text"
												placeholder="Amount"
												value={amount}
												name="amount"
												onChange={handleAmountChange}
											/>
											<div className="input-icon withdraw-amount-input-icon input-icon--auto input-icon--right ">
												<span className="enter-value__coin">
													{selectWallet?.asset?.code?.toUpperCase()}
												</span>
											</div>
											<div className="input-icon withdraw-amount-input-icon--more-right input-icon--auto input-icon--more-right ">
												<button
													type="button"
													className="input__link"
													onClick={handleClickWithdrawalMax}
												>
													MAX
												</button>
											</div>
										</div>
										{isInvalidAmountMinWithdrawalChecked ? (
											<TextError>Amount must be greater than minimum withdrawal!</TextError>
										) : null}
										{isAmountLessBalance ? (
											<TextError>Amount must be less than your balance!</TextError>
										) : null}
									</div>
								</div>
							</div>
						) : null}

						{receiveAmountIsVisible ? (
							<>
								<div className="form-block">
									<div className="enter-value">
										<span className="block-label block-label--grey">3. Receive amount</span>
										<div className="enter-value__group">
											<span className="enter-value__sum">
												{recieveAmount} {selectWallet?.asset?.code?.toUpperCase()}
											</span>
											<span className="enter-value__label enter-value__label--padding">
												{selectWalletNetworks?.withdraw_fee}{' '}
												{selectWallet?.asset?.code?.toUpperCase()} network fee included
											</span>
										</div>
									</div>
								</div>
								<div className="form-submit">
									<button
										className="button button--full-width"
										type="button"
										disabled={withdrawIsDisable}
										onClick={() => setOpenModal((prevOpenModal) => !prevOpenModal)}
									>
										Withdraw
									</button>
									<WitdrawCryptoConfirmPopup
										openModal={openModal}
										closeModal={closeModal}
										address={walletAddressTo}
										recieveAmount={recieveAmount}
										amount={Number(amount)}
										currentWallet={selectWallet}
										currentWalletNetwork={selectWalletNetworks}
									/>
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(CreateWithdrawCrypto);
