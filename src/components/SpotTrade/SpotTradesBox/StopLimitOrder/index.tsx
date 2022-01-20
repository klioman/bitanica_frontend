/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssetPairsFeesAndLimitsList } from 'redux/reducers/assetPairs/selectors';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { createStopLimitOrderRequest } from 'redux/reducers/orders/reducer';
import { getTempOrderPrice } from 'redux/reducers/orders/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { numberValidation } from 'services/utils/numberValidation';
import TextError from 'ui/Formik/TextError';
import LoginOrRegister from 'ui/LoginOrRegister';
import PercentRadioButtons from '../PercentRadioButtons';
import { IStopLimitOrderProps } from './types';

// ================================================:
const StopLimitOrder: FC<IStopLimitOrderProps> = ({
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
		stop: '',
		quantity: '',
		limit: '',
		type: mode.toLowerCase(),
	};

	const [stopLimitOrder, setStopLimitOrder] = useState({ ...initState });
	const [total, setTotal] = useState('');

	const isDisabled =
		!Number(stopLimitOrder.limit) ||
		!Number(stopLimitOrder.quantity) ||
		Number(stopLimitOrder.quantity) > currentAssetPairLimitsAmountMax ||
		Number(stopLimitOrder.quantity) < currentAssetPairLimitsAmountMin;

	const isMaxAmountError =
		authIsAuthenticated &&
		Number(stopLimitOrder.quantity) &&
		Number(stopLimitOrder.quantity) > currentAssetPairLimitsAmountMax;

	const isMaxAmountSellError =
		authIsAuthenticated &&
		Number(stopLimitOrder.quantity) &&
		mode === 'Sell' &&
		Number(stopLimitOrder.quantity) > balance;

	const isMinAmountError =
		authIsAuthenticated &&
		Number(stopLimitOrder.quantity) &&
		Number(stopLimitOrder.quantity) < currentAssetPairLimitsAmountMin;

	const isBuyTotalError =
		authIsAuthenticated && mode === 'Buy' && Number(total) && Number(total) > balance;

	useEffect(() => {
		setStopLimitOrder({
			...initState,
			pair_code: currentPair,
		});
		setTotal('');
	}, [currentPair]);

	useEffect(() => {
		setStopLimitOrder({
			...initState,
			limit: String(tempOrderPrice || ''),
		});
	}, [tempOrderPrice]);

	const handleChangeTotal = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (numberValidation(value) && stopLimitOrder.limit) {
			setTotal(value);

			if (
				Number(value) / Number(stopLimitOrder.limit) > currentAssetPairLimitsAmountMax ||
				Number(value) / Number(stopLimitOrder.limit) < currentAssetPairLimitsAmountMin
			) {
				setStopLimitOrder({
					...stopLimitOrder,
					quantity: '',
				});
			} else {
				setStopLimitOrder({
					...stopLimitOrder,
					quantity: String(fixedCropNumber(Number(value) / Number(stopLimitOrder.limit), 6)),
				});
			}
		}
	};

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (numberValidation(value)) {
			setStopLimitOrder({
				...stopLimitOrder,
				[name]: value,
			});

			if (name === 'limit' && stopLimitOrder.quantity) {
				setTotal(String(fixedCropNumber(Number(stopLimitOrder.quantity) * Number(value), 6)));
			}

			if (name === 'quantity' && stopLimitOrder.limit) {
				if (
					Number(value) > currentAssetPairLimitsAmountMax ||
					Number(value) < currentAssetPairLimitsAmountMin
				) {
					setTotal('');
				} else {
					setTotal(String(fixedCropNumber(Number(stopLimitOrder.limit) * Number(value), 6)));
				}
			}
		}
	};

	const handleTradeClick = () => {
		const { quantity, limit, stop } = stopLimitOrder;

		if (quantity && limit && stop) {
			const createOrderData = {
				...stopLimitOrder,
				quantity: fixedCropNumber(Number(quantity), 6),
				limit: fixedCropNumber(Number(limit), 6),
				stop: fixedCropNumber(Number(stop), 6),
			};

			dispatch(createStopLimitOrderRequest(createOrderData));
		}

		setStopLimitOrder({
			...initState,
		});
		setTotal('');
	};

	const countOrder = (value: number) => {
		if (stopLimitOrder.limit && value >= 0) {
			if (value > currentAssetPairLimitsAmountMax || value < currentAssetPairLimitsAmountMin) {
				setStopLimitOrder({
					...stopLimitOrder,
					quantity: '',
				});
			} else {
				setStopLimitOrder({
					...stopLimitOrder,
					quantity: String(fixedCropNumber(Number(value), 6)),
				});
			}

			setTotal(String(fixedCropNumber(Number(stopLimitOrder.limit) * value, 6)));
		} else if (mode === 'Sell') {
			setStopLimitOrder({
				...stopLimitOrder,
				quantity: String(fixedCropNumber(Number(value), 6)),
			});
		}
	};

	const percentButtonCountValue = (percentValue: number): number => {
		if (!balance || !Number(percentValue)) {
			return 0;
		}

		if (mode === 'Buy' && Number(stopLimitOrder?.limit) && Number(stopLimitOrder?.stop)) {
			return (balance / Number(stopLimitOrder?.limit)) * percentValue;
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
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.stop_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								value={stopLimitOrder.stop}
								name="stop"
								onChange={handleChangeInput}
							/>
							<p className="input__name">{assetBalanceCode?.toUpperCase()}</p>
						</label>
					</div>
				</div>
			</div>
			<div className="trade-form__item">
				<div className="input input-order-item">
					<div className="input-wrapper">
						<label className="trade-form__input">
							<p className="input__name">
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.limit_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								value={stopLimitOrder.limit}
								name="limit"
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
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.amount_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								value={stopLimitOrder.quantity}
								name="quantity"
								onChange={handleChangeInput}
							/>
							<p className="input__name">{assetToTradeCode?.toUpperCase()}</p>
						</label>
						{isMaxAmountError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.max_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMax}
							</TextError>
						) : null}

						{isMinAmountError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.min_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMin}
							</TextError>
						) : null}

						{isMaxAmountSellError ? (
							<TextError>
								{L.translate(
									'Trade.Spot.SpotTradeBox.StopLimitOrder.amount_available_balance_error_text',
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
				amount={stopLimitOrder.quantity}
			/>
			<div className="trade-form__item">
				<div className="input input-order-item">
					<div className="input-wrapper">
						<label className={getFieldClass('total')}>
							<p className="input__name">
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.total_field_name')}
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
								{L.translate('Trade.Spot.SpotTradeBox.StopLimitOrder.total_error_text')}
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

export default StopLimitOrder;
