/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { getAssetPairsFeesAndLimitsList } from 'redux/reducers/assetPairs/selectors';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { calculateMarketOrderRequest, createOrderRequest } from 'redux/reducers/orders/reducer';
import { getCalculateMarketOrder } from 'redux/reducers/orders/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { numberValidation } from 'services/utils/numberValidation';
import TextError from 'ui/Formik/TextError';
import LoginOrRegister from 'ui/LoginOrRegister';
import PercentRadioButtons from '../PercentRadioButtons';
import { IMarketOrderProps } from './types';

// ================================================:
const MarketOrder: FC<IMarketOrderProps> = ({
	mode,
	assetToTradeCode,
	assetBalanceCode,
	balance,
}) => {
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);
	const currentPair = useSelector(getCurrentPair);
	const calculateMarketOrderData = useSelector(getCalculateMarketOrder);
	const assetPairsFeesAndLimit = useSelector(getAssetPairsFeesAndLimitsList);

	const dispatch = useDispatch();

	const initState = {
		pair_code: currentPair,
		quantity: '',
		type: `market_${mode.toLowerCase()}`,
	};

	const [marketOrderState, setMarketOrderState] = useState({ ...initState });

	const currentAssetPairLimits = useMemo(() => {
		return assetPairsFeesAndLimit?.length
			? assetPairsFeesAndLimit.find((pair) => pair.code === currentPair)
			: null;
	}, [assetPairsFeesAndLimit, currentPair]);

	const currentAssetPairLimitsAmountMin = currentAssetPairLimits?.amount_min || 0;
	const currentAssetPairLimitsAmountMax = currentAssetPairLimits?.amount_max || 0;

	const isMaxAmountBuyError =
		authIsAuthenticated &&
		Number(marketOrderState.quantity) &&
		Number(calculateMarketOrderData?.total) &&
		Number(calculateMarketOrderData?.total) > currentAssetPairLimitsAmountMax;

	const isMinAmountBuyError =
		authIsAuthenticated &&
		Number(marketOrderState.quantity) &&
		Number(calculateMarketOrderData?.total) &&
		Number(calculateMarketOrderData?.total) < currentAssetPairLimitsAmountMin;

	const isMaxAmountSellError =
		authIsAuthenticated &&
		Number(marketOrderState.quantity) &&
		Number(marketOrderState.quantity) > currentAssetPairLimitsAmountMax;

	const isMinAmountSellError =
		authIsAuthenticated &&
		Number(marketOrderState.quantity) &&
		Number(marketOrderState.quantity) < currentAssetPairLimitsAmountMin;

	const isDisabled =
		!Number(marketOrderState.quantity) ||
		(mode === 'Buy'
			? isMaxAmountBuyError || isMinAmountBuyError
			: isMaxAmountSellError || isMinAmountSellError);

	useEffect(() => {
		setMarketOrderState({
			...initState,
			pair_code: currentPair,
		});
	}, [currentPair]);

	useEffect(() => {
		const { quantity } = marketOrderState;

		if (currentPair && Number(quantity) && mode) {
			const caclulateRequestData = {
				pair_code: initState.pair_code,
				quantity: Number(quantity),
				type: `market_${mode.toLowerCase()}`,
			};

			dispatch(calculateMarketOrderRequest(caclulateRequestData));
		}
	}, [currentPair, marketOrderState, mode]);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (numberValidation(value)) {
			setMarketOrderState({
				...marketOrderState,
				[name]: value,
			});
		}
	};

	const handleTradeClick = () => {
		if (mode === 'Buy') {
			if (calculateMarketOrderData?.total) {
				const createOrderData = {
					...marketOrderState,
					quantity: Number(calculateMarketOrderData?.total),
				};

				dispatch(createOrderRequest(createOrderData));
			}
		} else {
			const { quantity } = marketOrderState;

			if (quantity) {
				const createOrderData = {
					...marketOrderState,
					quantity: Number(quantity),
				};

				dispatch(createOrderRequest(createOrderData));
			}
		}

		setMarketOrderState({
			...initState,
		});
	};

	const countOrder = (value: number) => {
		setMarketOrderState({
			...marketOrderState,
			quantity: String(fixedCropNumber(Number(value), 6)),
		});
	};

	const percentButtonCountValue = (percentValue: number): number => {
		if (!balance || !Number(percentValue)) {
			return 0;
		}

		return balance * percentValue;
	};

	const getFieldClass = (fieldName: string): string => {
		switch (fieldName) {
			case 'amount':
				if (mode === 'Buy') {
					return isMaxAmountBuyError || isMinAmountBuyError
						? 'trade-form__input input-form__item--error'
						: 'trade-form__input';
				}
				return isMaxAmountSellError || isMinAmountSellError
					? 'trade-form__input input-form__item--error'
					: 'trade-form__input';

			default:
				return 'trade-form__input';
		}
	};

	return (
		<>
			<div className="trade-form__item">
				<div className="input">
					<div className="input-wrapper">
						<label className={getFieldClass('amount')}>
							<p className="input__name">
								{L.translate('Trade.Spot.SpotTradeBox.MarketOrder.amount_field_name')}
							</p>
							<input
								className="input-item input-item--transparent input-item--right"
								type="text"
								placeholder="0.00"
								autoComplete="off"
								value={marketOrderState.quantity}
								name="quantity"
								onChange={handleChangeInput}
							/>
							<p className="input__name">
								{mode === 'Buy' ? assetBalanceCode?.toUpperCase() : assetToTradeCode?.toUpperCase()}
							</p>
						</label>
						{mode === 'Buy' && isMaxAmountBuyError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.MarketOrder.max_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMax} {assetToTradeCode?.toUpperCase()}
							</TextError>
						) : null}
						{mode === 'Buy' && isMinAmountBuyError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.MarketOrder.min_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMin} {assetToTradeCode?.toUpperCase()}
							</TextError>
						) : null}
						{mode === 'Sell' && isMaxAmountSellError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.MarketOrder.max_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMax} {assetToTradeCode?.toUpperCase()}
							</TextError>
						) : null}
						{mode === 'Sell' && isMinAmountSellError ? (
							<TextError>
								{L.translate('Trade.Spot.SpotTradeBox.MarketOrder.min_amount_error_text')}{' '}
								{currentAssetPairLimitsAmountMin} {assetToTradeCode?.toUpperCase()}
							</TextError>
						) : null}
					</div>
				</div>
			</div>
			<PercentRadioButtons
				countOrder={countOrder}
				percentButtonCountValue={percentButtonCountValue}
				mode={mode}
				amount={marketOrderState.quantity}
			/>
			{authIsAuthenticated ? (
				<button
					className={`button button--normal-height button--full-width ${
						mode === 'Buy' ? 'button--green' : 'button--red'
					} trade-form__btn`}
					type="button"
					onClick={handleTradeClick}
					disabled={!!isDisabled}
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

export default MarketOrder;
