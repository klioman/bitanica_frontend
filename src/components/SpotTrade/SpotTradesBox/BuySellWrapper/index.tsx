import { FC, memo, useMemo } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { getWalletsList } from 'redux/reducers/wallets/selectors';
import { getFirstPartPairCode, getLastPartPairCode } from 'services/utils/tradingPairHelpers';
import SwitchOrderType from '../SwitchOrderType';
import { IBuySellWrapperProps, ICurrentPairBalanceData, ISpotData } from './types';

// ================================================:
const getCurrentPairBalance = (
	spotDataValue: ISpotData | 0 | undefined,
	buyCode: string,
	sellCode: string,
	pair: string,
): ICurrentPairBalanceData => {
	if (pair && spotDataValue && spotDataValue[buyCode] && spotDataValue[sellCode]) {
		return {
			buy: { code: buyCode, balance: Number(spotDataValue[buyCode].balance) },
			sell: { code: sellCode, balance: Number(spotDataValue[sellCode].balance) },
		};
	}

	return {
		buy: { code: buyCode, balance: 0 },
		sell: { code: sellCode, balance: 0 },
	};
};

const BuySellWrapper: FC<IBuySellWrapperProps> = ({ orderType, mode }) => {
	const walletsList = useSelector(getWalletsList);
	const currentPair = useSelector(getCurrentPair);

	const walletsData = useMemo(() => {
		return (
			walletsList?.length &&
			walletsList.reduce((acc, el) => {
				acc[el.asset.code] = el;

				return acc;
			}, {} as ISpotData)
		);
	}, [walletsList]);

	const buyAssetCode = getLastPartPairCode(currentPair)?.toLowerCase();
	const sellAssetCode = getFirstPartPairCode(currentPair)?.toLowerCase();

	const currentPairBalance = getCurrentPairBalance(
		walletsData,
		buyAssetCode,
		sellAssetCode,
		currentPair,
	);

	return (
		<div className="trade-form__block">
			<div className="trade-form__header">
				<span className="trade-form__text">
					{L.translate('Trade.Spot.SpotTradeBox.BuySellWrapper.available_balance')}
				</span>
				<span className="trade-form__text">
					{mode === 'Buy' ? currentPairBalance?.buy?.balance : currentPairBalance?.sell?.balance}{' '}
					{mode === 'Buy'
						? currentPairBalance?.buy?.code?.toUpperCase()
						: currentPairBalance?.sell?.code?.toUpperCase()}
				</span>
			</div>

			<SwitchOrderType orderType={orderType} mode={mode} asset={currentPairBalance} />
		</div>
	);
};

export default memo(BuySellWrapper);
