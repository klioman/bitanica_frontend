/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAssetPairsFeesAndLimitsIsLoad,
	getAssetPairsFeesAndLimitsList,
	getAssetPairsIsLoad,
	getAssetPairsList,
} from 'redux/reducers/assetPairs/selectors';
import { getExchangeRateRequest, makeExchangeRequest } from 'redux/reducers/convert/reducer';
import { getExchangeRate, getExchangeRateIsLoad } from 'redux/reducers/convert/selectors';
import { getWalletsIsLoad, getWalletsList } from 'redux/reducers/wallets/selectors';
import { IWalletItem } from 'redux/reducers/wallets/types';
import TextError from 'ui/Formik/TextError';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { numberValidation } from 'services/utils/numberValidation';
import ConvertDropdown from 'ui/ConvertDropdown';
import ConvertPercentButtons from 'ui/ConvertPercentButtons';
import { convertWalletsFiltered } from 'services/utils/convertHelpers';
import Loader from 'ui/Loader';

const ConvertForm: FC = () => {
	const walletsList = useSelector(getWalletsList);
	const asssetPairs = useSelector(getAssetPairsList);
	const exchangeRate = useSelector(getExchangeRate);
	const assetPairsFeesAndLimit = useSelector(getAssetPairsFeesAndLimitsList);

	const walletsListIsLoad = useSelector(getWalletsIsLoad);
	const asssetPairsIsLoad = useSelector(getAssetPairsIsLoad);
	const exchangeRateIsLoad = useSelector(getExchangeRateIsLoad);
	const assetPairsFeesAndLimitIsLoad = useSelector(getAssetPairsFeesAndLimitsIsLoad);

	const dispatch = useDispatch();

	const [selectFromWallet, setSelectFromWallet] = useState<IWalletItem | null>(null);
	const [selectToWallet, setSelectToWallet] = useState<IWalletItem | null>(null);
	const [isReverse, setIsReverse] = useState(false);

	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');

	const handleFromWalletSelect = (value: IWalletItem): void => {
		setSelectFromWallet(value);

		setFrom('');
		setTo('');
	};

	const handleToWalletSelect = (value: IWalletItem): void => {
		setSelectToWallet(value);

		setFrom('');
		setTo('');
	};

	const currentAssetPairLimits = useMemo(() => {
		const currentPair = `${String(selectFromWallet?.asset?.code)}_${String(
			selectToWallet?.asset?.code,
		)}`;
		const currentPairReverse = `${String(selectToWallet?.asset?.code)}_${String(
			selectFromWallet?.asset?.code,
		)}`;

		return assetPairsFeesAndLimit?.length
			? assetPairsFeesAndLimit.find(
					(pair) => pair.code === currentPair || pair.code === currentPairReverse,
			  )
			: null;
	}, [assetPairsFeesAndLimit, selectFromWallet, selectToWallet]);

	const currentAssetPairLimitsAmountMin = currentAssetPairLimits?.amount_min || 0;
	const currentAssetPairLimitsAmountMax = currentAssetPairLimits?.amount_max || 0;

	useEffect(() => {
		if (
			selectFromWallet &&
			selectToWallet &&
			selectFromWallet?.asset?.id &&
			selectToWallet?.asset?.id
		) {
			const exchangeRateRequestData = {
				from_asset_id: selectFromWallet.asset.id,
				to_asset_id: selectToWallet.asset.id,
			};

			dispatch(getExchangeRateRequest(exchangeRateRequestData));
		}
	}, [selectFromWallet, selectToWallet, dispatch]);

	useEffect(() => {
		if (walletsList?.length && asssetPairs?.length) {
			setSelectFromWallet(
				walletsList?.find(
					(wallet) => wallet?.asset?.code === asssetPairs?.[0]?.code?.split('_')[0],
				) || null,
			);
			setSelectToWallet(
				walletsList?.find(
					(wallet) => wallet?.asset?.code === asssetPairs?.[1]?.code?.split('_')[1],
				) || null,
			);
		}
	}, [walletsList, asssetPairs]);

	const fromWalletsList = useMemo(
		() => convertWalletsFiltered(walletsList, asssetPairs, selectToWallet),
		[walletsList, selectToWallet, asssetPairs],
	);

	const toWalletsList = useMemo(
		() => convertWalletsFiltered(walletsList, asssetPairs, selectFromWallet),
		[walletsList, selectFromWallet, asssetPairs],
	);

	const handleWalletsSwap = () => {
		setSelectFromWallet(selectToWallet);
		setSelectToWallet(selectFromWallet);

		setIsReverse(!isReverse);

		setFrom('');
		setTo('');
	};

	const handleChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (numberValidation(value)) {
			setTo('');
			setFrom(value);
		}
	};

	const handleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (numberValidation(value)) {
			setFrom('');
			setTo(value);
		}
	};

	const handleConvert = () => {
		if (
			selectFromWallet &&
			selectToWallet &&
			selectFromWallet?.asset?.id &&
			selectToWallet?.asset?.id
		) {
			if (from && !to) {
				const testMakeExhangeRequestData = {
					from_asset_id: selectFromWallet.asset.id,
					to_asset_id: selectToWallet.asset.id,
					quantity: Number(from),
				};

				dispatch(makeExchangeRequest(testMakeExhangeRequestData));
			}

			if (!from && to) {
				const testMakeExhangeRequestData = {
					from_asset_id: selectToWallet.asset.id,
					to_asset_id: selectFromWallet.asset.id,
					quantity: Number(to),
				};

				dispatch(makeExchangeRequest(testMakeExhangeRequestData));
			}

			setFrom('');
			setTo('');
		}
	};

	const handleMaxBalance = () => {
		setFrom(String(selectFromWallet?.balance || 0));
	};

	const countFrom = (value: number) => {
		setFrom(String(value));
	};

	const percentButtonCountValue = (percentValue: number): number => {
		if (!selectFromWallet?.balance || !Number(percentValue)) {
			return 0;
		}

		return Number(selectFromWallet?.balance) * percentValue;
	};

	const getPlaceHolderTextValue = (type: string) => {
		if (type === 'from') {
			return !isReverse
				? `Please enter ${currentAssetPairLimitsAmountMin} - ${currentAssetPairLimitsAmountMax}`
				: `Please enter ${fixedCropNumber(
						Number(currentAssetPairLimitsAmountMin) / Number(exchangeRate?.rate),
						8,
				  )} - ${String(
						fixedCropNumber(
							Number(currentAssetPairLimitsAmountMax) / Number(exchangeRate?.rate),
							8,
						),
				  )}`;
		}

		if (type === 'to') {
			return !isReverse
				? `Please enter ${fixedCropNumber(
						Number(currentAssetPairLimitsAmountMin || 0) * Number(exchangeRate?.rate || 0),
						8,
				  )} - ${String(
						fixedCropNumber(
							Number(currentAssetPairLimitsAmountMax || 0) * Number(exchangeRate?.rate || 0),
							8,
						),
				  )}`
				: `Please enter ${currentAssetPairLimitsAmountMin} - ${currentAssetPairLimitsAmountMax}`;
		}

		return '';
	};

	const isMinAmountFromError = !isReverse
		? Number(from) && Number(from) < currentAssetPairLimitsAmountMin
		: Number(from) &&
		  Number(currentAssetPairLimitsAmountMin) / Number(exchangeRate?.rate) > Number(from);

	const isMaxAmountFromError = !isReverse
		? Number(from) && Number(from) > currentAssetPairLimitsAmountMax
		: Number(from) &&
		  Number(currentAssetPairLimitsAmountMax) / Number(exchangeRate?.rate) < Number(from);

	const isMinAmountToError = !isReverse
		? Number(to) && Number(to) < currentAssetPairLimitsAmountMin
		: Number(to) &&
		  Number(currentAssetPairLimitsAmountMin) * Number(exchangeRate?.rate) > Number(to);

	const isMaxAmountToError = !isReverse
		? Number(to) && Number(to) > currentAssetPairLimitsAmountMax
		: Number(to) &&
		  Number(currentAssetPairLimitsAmountMax) * Number(exchangeRate?.rate) < Number(to);

	const isAmountBiggerBalanceFromError =
		Number(from) && Number(from) > Number(selectFromWallet?.balance);

	const isAmountBiggerBalanceToError = Number(to) && Number(to) > Number(selectToWallet?.balance);

	const getFieldClass = (fieldName: string): string => {
		switch (fieldName) {
			case 'from':
				return isMinAmountFromError || isMaxAmountFromError
					? 'input-item input-item--enter-value input-item--right-double-icon convert-input-item--enter-value-error'
					: 'input-item input-item--enter-value input-item--right-double-icon';
			case 'to':
				return isMinAmountToError || isMaxAmountToError
					? 'input-item input-item--enter-value input-item--right-double-icon convert-input-item--enter-value-error'
					: 'input-item input-item--enter-value input-item--right-double-icon';

			default:
				return 'input-item input-item--enter-value';
		}
	};

	return (
		<div className="content-wrapper content-wrapper--padding-all content-wrapper--bg">
			<div className="container">
				<div className="page-info">
					<h3 className="page-info__title">Convert </h3>
					<p className="page-info__desc">
						In this section, you can quickly make a currency exchange.
						<br />
						To do this, the assets must be on the Trade Balance.
					</p>
				</div>
				<div className="convert">
					{walletsListIsLoad ||
					asssetPairsIsLoad ||
					exchangeRateIsLoad ||
					assetPairsFeesAndLimitIsLoad ? (
						<div className="convert-loader-wrapper">
							<Loader />
						</div>
					) : (
						<>
							<div className="enter-value">
								<div className="enter-value__header">
									<span className="enter-value__label">From</span>
									<span className="enter-value__label">
										Available: {selectFromWallet?.balance || 0}{' '}
										{selectFromWallet?.asset?.code?.toUpperCase()}
									</span>
								</div>
								<div className="enter-value__field convert-enter-value__field">
									<div className="convert-enter-value-field-box">
										<div className="input input--margin-none">
											<div className="input-wrapper">
												<input
													className={getFieldClass('from')}
													type="text"
													placeholder={getPlaceHolderTextValue('from')}
													onChange={handleChangeFrom}
													value={from}
												/>

												<div className="input-icon input-icon--auto input-icon--right convert-input-icon">
													<button type="button" className="input__link" onClick={handleMaxBalance}>
														MAX
													</button>
												</div>
											</div>
										</div>
										{fromWalletsList?.length && (
											<ConvertDropdown
												value={selectFromWallet}
												onChange={handleFromWalletSelect}
												options={fromWalletsList}
											/>
										)}
									</div>
									{isMaxAmountFromError ? (
										<TextError>
											{' '}
											Max amount{' '}
											{isReverse
												? currentAssetPairLimitsAmountMax / Number(exchangeRate?.rate)
												: currentAssetPairLimitsAmountMax}
										</TextError>
									) : null}
									{isMinAmountFromError ? (
										<TextError>
											Min amount{' '}
											{isReverse
												? currentAssetPairLimitsAmountMin / Number(exchangeRate?.rate)
												: currentAssetPairLimitsAmountMin}
										</TextError>
									) : null}
									{isAmountBiggerBalanceFromError ? (
										<TextError>The amount entered is greater than the balance</TextError>
									) : null}
								</div>
							</div>
							<div className="switch-img">
								<button className="switch-img__circle" type="button" onClick={handleWalletsSwap}>
									<div className="switch-img__wrap">
										<span className="switch-img__icon icon-arrow-3" />
									</div>
								</button>
							</div>
							<div className="enter-value">
								<div className="enter-value__header">
									<span className="enter-value__label">To</span>
								</div>
								<div className="enter-value__field convert-enter-value__field">
									<div className="convert-enter-value-field-box">
										<div className="input input--margin-none">
											<div className="input-wrapper">
												<input
													className={getFieldClass('to')}
													type="text"
													placeholder={getPlaceHolderTextValue('to')}
													onChange={handleChangeTo}
													value={to}
												/>
											</div>
										</div>
										{toWalletsList?.length && (
											<ConvertDropdown
												value={selectToWallet}
												onChange={handleToWalletSelect}
												options={toWalletsList}
											/>
										)}
									</div>
									{isMaxAmountToError ? (
										<TextError>
											{' '}
											Max amount{' '}
											{isReverse
												? currentAssetPairLimitsAmountMax * Number(exchangeRate?.rate)
												: currentAssetPairLimitsAmountMax}
										</TextError>
									) : null}
									{isMinAmountToError ? (
										<TextError>
											Min amount{' '}
											{isReverse
												? currentAssetPairLimitsAmountMin * Number(exchangeRate?.rate)
												: currentAssetPairLimitsAmountMin}
										</TextError>
									) : null}
									{isAmountBiggerBalanceToError ? (
										<TextError>The amount entered is greater than the balance</TextError>
									) : null}
								</div>
							</div>
							<div className="convert-calc">
								<div className="convert-calc__block">
									<span className="convert-calc__text">
										1 {selectFromWallet?.asset?.code?.toUpperCase()} ≈ {exchangeRate?.rate || 0}{' '}
										{selectToWallet?.asset?.code?.toUpperCase()}
									</span>
								</div>
							</div>

							<ConvertPercentButtons
								countFrom={countFrom}
								percentButtonCountValue={percentButtonCountValue}
								amount={from}
							/>

							<div className="convert__footer">
								<button
									className="button button--full-width"
									type="button"
									onClick={handleConvert}
									disabled={
										(!Number(from) && !Number(to)) ||
										!!isAmountBiggerBalanceFromError ||
										!!isAmountBiggerBalanceToError ||
										!!isMinAmountFromError ||
										!!isMaxAmountFromError ||
										!!isMinAmountToError ||
										!!isMaxAmountToError
									}
								>
									Enter an amount
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(ConvertForm);
