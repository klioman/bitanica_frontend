import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import { getUserSettingsData } from 'redux/reducers/settings/selectors';
import {
	confirmCryptoWithdrawRequest,
	sendWithdrawCryptoEmailCodeRequest,
} from 'redux/reducers/withdrawCrypto/reducer';
import { IConfyrmCryptoWithdrawalPayloadData } from 'redux/reducers/withdrawCrypto/types';
import { IWitdrawCryptoConfirmPopupProps } from './types';

const WitdrawCryptoConfirmPopup: FC<IWitdrawCryptoConfirmPopupProps> = ({
	openModal,
	closeModal,
	address,
	recieveAmount,
	amount,
	currentWallet,
	currentWalletNetwork,
}) => {
	const [seconds, setSeconds] = useState(0);
	const [isEmailSendCode, setIsEmailSendCode] = useState(false);
	const [isConfirmDesabled, setIsConfirmDesabled] = useState(false);
	const [emailCode, setEmeilCode] = useState('');
	const [totpCode, setTotpCode] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();
	const userSettigsData = useSelector(getUserSettingsData);

	const handleGetEmailCode = () => {
		dispatch(sendWithdrawCryptoEmailCodeRequest());

		setSeconds(60);
	};

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (seconds > 0) {
			timer = setTimeout(() => setSeconds(seconds - 1), 1000);
			setIsEmailSendCode(true);
		} else {
			setSeconds(0);
			setIsEmailSendCode(false);
		}

		return () => {
			clearTimeout(timer);
			setIsEmailSendCode(false);
		};
	}, [seconds]);

	const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (value.trim().length <= 6 && !Number.isNaN(Number(value))) {
			setEmeilCode(value);
		}
	};

	const handleChangeTotp = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (value.trim().length <= 6 && !Number.isNaN(Number(value))) {
			setTotpCode(value);
		}
	};

	const handleConfirmCryptoWithdrawal = () => {
		setIsConfirmDesabled(true);

		const withdrawalPayloadData: IConfyrmCryptoWithdrawalPayloadData = {
			data: {
				wallet_id: currentWallet?.id,
				amount,
				address,
				network: currentWalletNetwork?.network_id,
				email_code: emailCode,
			},
			history,
			closeModal,
			setIsConfirmDesabled,
		};

		if (totpCode) {
			withdrawalPayloadData.data.totp = totpCode;
		}

		dispatch(confirmCryptoWithdrawRequest(withdrawalPayloadData));
	};

	return (
		<Popup open={openModal} closeOnDocumentClick onClose={closeModal} closeOnEscape>
			<div className="popup-window">
				<button
					className="popup-close"
					type="button"
					onClick={() => {
						closeModal();
						setEmeilCode('');
					}}
				>
					<span className="popup-close__icon icon-close" />
				</button>
				<div className="popup-window__inside">
					<div className="popup popup--medium">
						<div className="popup-header popup-header--padding">
							<p className="popup-header__title">Withdrawal</p>
						</div>
						<div className="popup-body popup-body--margin-none">
							<div className="withdrawal-options">
								<div className="withdrawal-option">
									<span className="withdrawal-option__title">Amount</span>
									<span className="withdrawal-option__desc">
										Receive {recieveAmount} {currentWallet?.asset?.code?.toUpperCase()} (Network fee{' '}
										{currentWalletNetwork?.withdraw_fee} {currentWallet?.asset?.code?.toUpperCase()}
										)
									</span>
								</div>
								<div className="withdrawal-option">
									<span className="withdrawal-option__title">Address</span>
									<span className="withdrawal-option__desc">{address}</span>
								</div>
								<div className="withdrawal-option">
									<span className="withdrawal-option__title">Network</span>
									<span className="withdrawal-option__desc">
										{currentWalletNetwork?.network_name?.toUpperCase()}
									</span>
								</div>
								<div className="withdrawal-option">
									<span className="withdrawal-option__title">Source</span>
									<span className="withdrawal-option__desc">Spot Wallet</span>
								</div>
							</div>
							<div className="withdrawal-code">
								<div className="form-group withdrawal-code__group">
									<div className="withdrawal-code__field">
										<div className="input input--margin-none">
											<div className="input-wrapper">
												<input
													className="input-item"
													type="text"
													placeholder="Email verification code"
													value={emailCode}
													onChange={handleChangeEmail}
												/>
											</div>
										</div>
									</div>
									{isEmailSendCode && seconds > 0 ? (
										<p className="timer-wrapper">{seconds}s</p>
									) : (
										<button
											className="button button--small"
											type="button"
											onClick={handleGetEmailCode}
										>
											Get code
										</button>
									)}
								</div>
								<div className="input-notify">
									<span className="input-notify__text input-notify__text--medium withdraw-notify-helper-message">
										Enter the 6-digit code sent to {userSettigsData?.email}
									</span>
								</div>
							</div>
							{userSettigsData?.google2fa_enabled ? (
								<div className="withdrawal-code">
									<div className="form-group withdrawal-code__group">
										<div className="withdrawal-code__field">
											<div className="input input--margin-none">
												<div className="input-wrapper">
													<input
														className="input-item"
														type="text"
														placeholder="2FA code"
														value={totpCode}
														onChange={handleChangeTotp}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="input-notify">
										<span className="input-notify__text input-notify__text--medium withdraw-notify-helper-message">
											Enter the 6-digit code sent to Google 2FA
										</span>
									</div>
								</div>
							) : null}
							<ul className="withdrawal-list">
								<li className="withdrawal-list__item">
									Ensure that the address is correct and on the same network.
								</li>
								<li className="withdrawal-list__item">Transactions cannot be cancelled.</li>
							</ul>
						</div>
						<div className="popup-submit popup-submit--sb">
							<button
								className="button button--full-width"
								type="button"
								disabled={
									!emailCode ||
									(!!userSettigsData?.google2fa_enabled && !totpCode) ||
									isConfirmDesabled
								}
								onClick={handleConfirmCryptoWithdrawal}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default memo(WitdrawCryptoConfirmPopup);
