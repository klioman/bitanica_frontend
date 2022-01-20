/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssetPairsFeesAndLimitsList } from 'redux/reducers/assetPairs/selectors';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { calculateLimitOrderRequest, createOrderRequest } from 'redux/reducers/orders/reducer';
import { getTempOrderPrice } from 'redux/reducers/orders/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { numberValidation } from 'services/utils/numberValidation';
import TextError from 'ui/Formik/TextError';
import LoginOrRegister from 'ui/LoginOrRegister';
import PercentRadioButtons from '../PercentRadioButtons';
import { ILimitOrderProps } from './types';

const LimitOrder: FC<ILimitOrderProps> = ({
	mode,
	assetToTradeCode,
	assetBalanceCode,
	balance,
}) => {
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);
	const currentPair = useSelector(getCurrentPair);
	const assetPairsFeesAndLimit = useSelector(getAssetPairsFeesAndLimitsList);
	const tempOrderPrice = useSelector(getTempOrderPrice);

	const dispatch = useDispatch();

	const currentAssetPairLimits = useMemo(() => {
		return assetPairsFeesAndLimit?.length
			? assetPairsFeesAndLimit.find((pair) => pair.code === currentPair)
			: null;
	}, [assetPairsFeesAndLimit, currentPair]);

	const currentAssetPairLimitsAmountMin = currentAssetPairLimits?.amount_min || 0;
	const currentAssetPairLimitsAmountMax = currentAssetPairLimits?.amount_max || 0;

	const initState = {
		pair_code: currentPair,
		quantity: '',
		price: '',
		type: mode.toLowerCase(),
	};

	const [limitOrderState, setLimitOrderState] = useState({ ...initState });
	const [total, setTotal] = useState('');

	const isDisabled =
		!Number(limitOrderState.price) ||
		!Number(limitOrderState.quantity) ||
		Number(limitOrderState.quantity) > currentAssetPairLimitsAmountMax ||
		Number(limitOrderState.quantity) < currentAssetPairLimitsAmountMin;

	const isMaxAmountError =
		authIsAuthenticated &&
		Number(limitOrderState.quantity) &&
		Number(limitOrderState.quantity) > currentAssetPairLimitsAmountMax;

	const isMaxAmountSellError =
		authIsAuthenticated &&
		Number(limitOrderState.quantity) &&
		mode === 'Sell' &&
		Number(limitOrderState.quantity) > balance;

	const isMinAmountError =
		authIsAuthenticated &&
		Number(limitOrderState.quantity) &&
		Number(limitOrderState.quantity) < currentAssetPairLimitsAmountMin;

	const isBuyTotalError =
		authIsAuthenticated && mode === 'Buy' && Number(total) && Number(total) > balance;

	useEffect(() => {
		setLimitOrderState({
			...initState,
			pair_code: currentPair,
		});
		setTotal('');
	}, [currentPair]);

	useEffect(() => {
		setLimitOrderState({
			...initState,
			price: String(tempOrderPrice || ''),
		});
	}, [tempOrderPrice]);

	useEffect(() => {
		const { quantity, price } = limitOrderState;

		if (currentPair && Number(quantity) && Number(price) && mode) {
			const caclulateRequestData = {
				pair_code: initState.pair_code,
				quantity: Number(quantity),
				price: Number(price),
				type: mode.toLowerCase(),
			};

			dispatch(calculateLimitOrderRequest(caclulateRequestData));
		}
	}, [currentPair, limitOrderState, mode]);

	const handleChangeTotal = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (numberValidation(value) && limitOrderState.price) {
			setTotal(value);

			if (
				Number(value) / Number(limitOrderState.price) > currentAssetPairLimitsAmountMax ||
				Number(value) / Number(limitOrderState.price) < currentAssetPairLimitsAmountMin
			) {
				setLimitOrderState({
					...limitOrderState,
					quantity: '',
				});
			} else {
				setLimitOrderState({
					...limitOrderState,
					quantity: String(fixedCropNumber(Number(value) / Number(limitOrderState.price), 6)),
				});
			}
		}
	};

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (numberValidation(value)) {
			setLimitOrderState({
				...limitOrderState,
				[name]: value,
			});

			if (name === 'price' && limitOrderState.quantity) {
				setTotal((Number(limitOrderState.quantity) * Number(value)).toFixed(6));
			}

			if (name === 'quantity' && limitOrderState.price) {
				if (
					Number(value) > currentAssetPairLimitsAmountMax ||
					Number(value) < currentAssetPairLimitsAmountMin
				) {
					setTotal('');
				} else {
					setTotal((Number(limitOrderState.price) * Number(value)).toFixed(6));
				}
			}
		}
	};

	const handleTradeClick = () => {
		const { quantity, price } = limitOrderState;

		if (quantity && price) {
			const createOrderData = {
				...limitOrderState,
				quantity: Number(quantity),
				price: Number(price),
			};

			dispatch(createOrderRequest(createOrderData));
		}

		setLimitOrderState({
			...initState,
		});
		setTotal('');
	};

	const countOrder = (value: number) => {
		if (limitOrderState.price && value >= 0) {
			if (value > currentAssetPairLimitsAmountMax || value < currentAssetPairLimitsAmountMin) {
				setLimitOrderState({
					...limitOrderState,
					quantity: '',
				});
			} else {
				setLimitOrderState({
					...limitOrderState,
					quantity: String(fixedCropNumber(Number(value), 6)),
				});
			}

			setTotal(String(fixedCropNumber(Number(limitOrderState.price) * value, 6)));
		} else if (mode === 'Sell') {
			setLimitOrderState({
				...limitOrderState,
				quantity: String(fixedCropNumber(Number(value), 6)),
			});
		}
	};

	const percentButtonCountValue = (percentValue: number): number => {
		if (!balance || !Number(percentValue)) {
			return 0;
		}

		if (mode === 'Buy' && Number(limitOrderState?.price)) {
			return (balance / Number(limitOrderState?.price)) * percentValue;
		}

		return balance * percentValue;
	};

	const getFieldClass = (fieldName: string): string => {
		switch (fieldName) {
			case 'amount':
				return isMaxAmountError || isMinAmountError || isMaxAmountSellError
					? 'trade-form__input input-form__item--error'
					: 'trade-form__input';

			case 'total':
				return isBuyTotalError && mode === 'Buy'
					? 'trade-form__input input-form__item--error'
					: 'trade-form__input';

			default:
				return 'trade-form__input';
		}
	};

	return (
		<>
			<div className="trade-form__item">
				<div className="input input-order-item">
					<div className="input-wrapper">
						<label className="trade-form__input">
							<p className="input__name">
								{L.translate('Trade.Spot.SpotTradeBox.LimitOrder.price_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								value={limitOrderState.price}
								name="price"
								onChange={handleChangeInput}
							/>
							<p className="input__name">{assetBalanceCode?.toUpperCase()}</p>
						</label>
					</div>
				</div>
			</div>
			<div className="trade-form__item">
				<div className="input">
					<div className="input-wrapper">
						<label className={getFieldClass('amount')}>
							<p className="input__name">
								{L.translate('Trade.Spot.SpotTradeBox.LimitOrder.amount_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								value={limitOrderState.quantity}
								name="quantity"
								onChange={handleChangeInput}
							/>
							<p className="input__name">{assetToTradeCode?.toUpperCase()}</p>
						</label>
						{isMaxAmountError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.LimitOrder.max_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMax}
							</TextError>
						) : null}

						{isMinAmountError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.LimitOrder.min_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMin}
							</TextError>
						) : null}

						{isMaxAmountSellError ? (
							<TextError>
								{L.translate(
									'Trade.Spot.SpotTradeBox.LimitOrder.amount_available_balance_error_text',
								)}
							</TextError>
						) : null}
					</div>
				</div>
			</div>
			<PercentRadioButtons
				countOrder={countOrder}
				percentButtonCountValue={percentButtonCountValue}
				mode={mode}
				amount={limitOrderState.quantity}
			/>
			<div className="trade-form__item">
				<div className="input input-order-item">
					<div className="input-wrapper">
						<label className={getFieldClass('total')}>
							<p className="input__name">
								{L.translate('Trade.Spot.SpotTradeBox.LimitOrder.total_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								name="total"
								onChange={handleChangeTotal}
								value={total}
							/>
							<p className="input__name">{assetBalanceCode?.toUpperCase()}</p>
						</label>
						{authIsAuthenticated && isBuyTotalError && mode === 'Buy' ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.LimitOrder.total_error_text')}
							</TextError>
						) : null}
					</div>
				</div>
			</div>
			{authIsAuthenticated ? (
				<button
					className={`button button--normal-height button--full-width ${
						mode === 'Buy' ? 'button--green' : 'button--red'
					} trade-form__btn`}
					type="button"
					onClick={handleTradeClick}
					disabled={isDisabled || !!isBuyTotalError || !!isMaxAmountSellError}
				>
					{mode === 'Buy'
						? L.translate('Trade.Spot.SpotTradeBox.OrderButtons.buy_button')
						: L.translate('Trade.Spot.SpotTradeBox.OrderButtons.sell_button')}{' '}
					{assetToTradeCode?.toUpperCase()}
				</button>
			) : (
				<div className="create-order-btn-login-register-wrapper">
					<LoginOrRegister />
				</div>
			)}
		</>
	);
};

export default LimitOrder;
