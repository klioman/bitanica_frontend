import { FC, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getAssetPairsList } from 'redux/reducers/assetPairs/selectors';
import { getSpotRecentTrades } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import {
	getFirstPartPairCode,
	getLastPartPairCode,
	transformPairCode,
} from 'services/utils/tradingPairHelpers';
import useDecimals from 'hooks/useDecimals';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { convertExponentialToDecimal } from 'services/utils/convertEcponential';
import SpotMarketSettingsModal from '../SpotMarketSettingsModal';

// ================================================:
const SpotMarketHeader: FC = () => {
	const [openModal, setOpenModal] = useState(false);
	const closeModal = () => setOpenModal(false);

	const currentPair = useSelector(getCurrentPair);
	const assetPairsList = useSelector(getAssetPairsList);
	const recentTrades = useSelector(getSpotRecentTrades);

	const [priceDecimal] = useDecimals();

	const firstRecentTradeItem = recentTrades?.length && recentTrades[0]?.price;
	const secondRecentTradesItem = recentTrades?.length && recentTrades[1]?.price;

	const lastRecentTradeIsLow = Number(firstRecentTradeItem) < Number(secondRecentTradesItem);

	const currentAssetPairData = useMemo(() => {
		return assetPairsList?.length ? assetPairsList.find((el) => el.code === currentPair) : null;
	}, [assetPairsList, currentPair]);

	const getMarketDynamicValueColorClass = (value: boolean): string => {
		switch (value) {
			case true:
				return 'market-dynamic__value market-dynamic__num--red';

			case false:
				return 'market-dynamic__value market-dynamic__num--green';

			default:
				return 'market-dynamic__value';
		}
	};

	const getPlusOrmMinus = (isValue: boolean): string => (isValue ? '+' : '');

	return currentAssetPairData ? (
		<div className="market-header">
			<div className="market-header__side">
				<div className="market-currency market-header__item">
					<div className="select market-currency__select">
						<div className="select__current">
							<span>{transformPairCode(currentAssetPairData?.code || '')}</span>
						</div>
					</div>
				</div>
				<div className="market-header__item">
					<div className="market-dynamic">
						<span className={getMarketDynamicValueColorClass(lastRecentTradeIsLow)}>
							{fixedCropNumber(Number(firstRecentTradeItem), priceDecimal) || firstRecentTradeItem}
						</span>
						<div className="market-dynamic__num market-dynamic__num--small">
							$ {Number(currentAssetPairData?.last_price_usd || 0).toFixed(2)}
						</div>
					</div>
					<div className="market-dynamic">
						<span className="market-dynamic__title">
							{String(L.translate('Trade.Spot.SpotMarketHeader.change_24_text'))}
						</span>
						<div
							className={`market-dynamic__num ${
								currentAssetPairData?.change24h && currentAssetPairData?.change24h > 0
									? 'market-dynamic__num--green'
									: 'market-dynamic__num--red'
							} `}
						>
							{convertExponentialToDecimal(Number(currentAssetPairData?.change24h_value)) ||
								currentAssetPairData?.change24h_value}{' '}
							{getPlusOrmMinus(currentAssetPairData?.change24h > 0)}
							{currentAssetPairData?.change24h}%
						</div>
					</div>
				</div>
				<div className="market-header__item">
					<div className="market-dynamic">
						<span className="market-dynamic__title">
							{String(L.translate('Trade.Spot.SpotMarketHeader.high_24_text'))}
						</span>
						<div className="market-dynamic__num">{currentAssetPairData?.high24}</div>
					</div>
				</div>
				<div className="market-header__item">
					<div className="market-dynamic">
						<span className="market-dynamic__title">
							{String(L.translate('Trade.Spot.SpotMarketHeader.low_24_text'))}
						</span>
						<div className="market-dynamic__num">{currentAssetPairData?.low24}</div>
					</div>
				</div>
				<div className="market-header__item">
					<div className="market-dynamic">
						<span className="market-dynamic__title">
							{String(L.translate('Trade.Spot.SpotMarketHeader.volume_24_text'))}(
							{getFirstPartPairCode(currentAssetPairData?.code || '')})
						</span>
						<div className="market-dynamic__num">{currentAssetPairData?.volume24h}</div>
					</div>
				</div>
				<div className="market-header__item">
					<div className="market-dynamic">
						<span className="market-dynamic__title">
							{String(L.translate('Trade.Spot.SpotMarketHeader.volume_24_text'))}(
							{getLastPartPairCode(currentAssetPairData?.code || '')})
						</span>
						<div className="market-dynamic__num">{currentAssetPairData?.volumeQuote24}</div>
					</div>
				</div>
			</div>
			<div className="market-header__side">
				<button
					className="button button--settings"
					type="button"
					onClick={() => setOpenModal((prevOpenModal) => !prevOpenModal)}
				>
					<span className="button__icon icon-settings" />
					<span className="button__text">
						{String(L.translate('Trade.Spot.SpotMarketHeader.workspace_settings_button'))}
					</span>
				</button>
				<SpotMarketSettingsModal openModal={openModal} closeModal={closeModal} />
			</div>
		</div>
	) : null;
};

export default SpotMarketHeader;
