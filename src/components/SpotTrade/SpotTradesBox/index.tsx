import { FC, useState, MouseEvent } from 'react';
import SocketWithPrivateTopicConnectWrapper from 'components/SocketWithPrivateTopicConnectWrapper';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getWorkspaceSettings } from 'redux/reducers/tradingSettings/selectors';
import BuySellWrapper from './BuySellWrapper';

const SpotTradesBox: FC = () => {
	const workspaceSettings = useSelector(getWorkspaceSettings);
	const [orderType, setOrderType] = useState('limit_order');
	const [currentOrderTypeTab, setCurrentOrderTypeTab] = useState('buy');

	const handleChangeOrderType = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setOrderType(name);
	};

	const handleChangeCurrentOrderTypeTab = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setCurrentOrderTypeTab(name);
	};

	return (
		<SocketWithPrivateTopicConnectWrapper topicName="balances">
			<div className="market-block market-block--padding-none">
				<div
					className={`trade-form-box ${
						!workspaceSettings?.orderBookSection || !workspaceSettings?.tradingPairsSection
							? 'trade-form-box--small'
							: ''
					}`}
				>
					<div className="trade-switch">
						<button className="trade-switch__item trade-switch__item--active" type="button">
							{L.translate('Trade.Spot.SpotTradeBox.spot_trading')}
						</button>
						<button className="trade-switch__item" type="button">
							{L.translate('Trade.Spot.SpotTradeBox.margin_trading')}
						</button>
					</div>
					<div className="trade-form-box__content">
						{(!workspaceSettings?.orderBookSection || !workspaceSettings?.tradingPairsSection) && (
							<div className="tabs-type">
								<button
									className={`tabs-type__item ${
										currentOrderTypeTab === 'buy' ? 'tabs-type__item--active' : ''
									}`}
									type="button"
									name="buy"
									onClick={handleChangeCurrentOrderTypeTab}
								>
									{L.translate('Trade.Spot.SpotTradeBox.buy_button')}
								</button>
								<button
									className={`tabs-type__item ${
										currentOrderTypeTab === 'sell' ? 'tabs-type__item--active' : ''
									}`}
									type="button"
									name="sell"
									onClick={handleChangeCurrentOrderTypeTab}
								>
									{L.translate('Trade.Spot.SpotTradeBox.sell_button')}
								</button>
							</div>
						)}

						<div
							className={`trade-tabs ${
								!workspaceSettings?.orderBookSection || !workspaceSettings?.tradingPairsSection
									? 'trade-tabs--small'
									: ''
							}`}
						>
							<button
								className={`trade-tabs__item ${
									orderType === 'limit_order' ? 'trade-tabs__item--active' : ''
								}`}
								type="button"
								name="limit_order"
								onClick={handleChangeOrderType}
							>
								{L.translate('Trade.Spot.SpotTradeBox.limit_order_name')}
							</button>
							<button
								className={`trade-tabs__item ${
									orderType === 'market_order' ? 'trade-tabs__item--active' : ''
								}`}
								type="button"
								name="market_order"
								onClick={handleChangeOrderType}
							>
								{L.translate('Trade.Spot.SpotTradeBox.market_order_name')}
							</button>
							<button
								className={`trade-tabs__item ${
									orderType === 'stop_limit_order' ? 'trade-tabs__item--active' : ''
								}`}
								type="button"
								name="stop_limit_order"
								onClick={handleChangeOrderType}
							>
								{L.translate('Trade.Spot.SpotTradeBox.stop_limit_order_name')}
								<span className="icon-question" />
							</button>
						</div>
						<div className="trade-form">
							<div className="trade-form__group">
								{currentOrderTypeTab === 'buy' ? (
									<BuySellWrapper orderType={orderType} mode="Buy" />
								) : (
									<BuySellWrapper orderType={orderType} mode="Sell" />
								)}

								{workspaceSettings?.orderBookSection && workspaceSettings?.tradingPairsSection && (
									<BuySellWrapper orderType={orderType} mode="Sell" />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</SocketWithPrivateTopicConnectWrapper>
	);
};

export default SpotTradesBox;
