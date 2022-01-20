import SocketWithPrivateTopicConnectWrapper from 'components/SocketWithPrivateTopicConnectWrapper';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getSpotUserOpenOrders } from 'redux/reducers/spotTrade/selectors';
import LoginOrRegister from 'ui/LoginOrRegister';
import OpenOrders from './OpenOrders';
import OrdersHistory from './OrdersHistory';
import TradesHitory from './TradesHitory';

const SpotHistoryTables: FC = () => {
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);
	const openOrders = useSelector(getSpotUserOpenOrders);
	const [currentTableTab, setCurrentTableTab] = useState('open');

	const [otherPairsIsHide, setOtherPairsIsHide] = useState(false);

	const handleChangeCurrentTableTab = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setCurrentTableTab(name);
	};

	const totalOpenOrders = openOrders?.total || 0;

	const currentTable = {
		open: <OpenOrders otherPairsIsHide={otherPairsIsHide} />,
		closed: <OrdersHistory otherPairsIsHide={otherPairsIsHide} />,
		trades: <TradesHitory otherPairsIsHide={otherPairsIsHide} />,
	};

	const handleChangeOtherPairsIsHide = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;

		setOtherPairsIsHide(checked);
	};

	return (
		<SocketWithPrivateTopicConnectWrapper topicName="open_orders:spot">
			<SocketWithPrivateTopicConnectWrapper topicName="closed_orders:spot">
				<div className="market-block">
					<div className="market-footer">
						<div className="market-footer__top">
							<div className="market-tabs market-footer__tabs">
								<button
									className={`market-tabs__item ${
										currentTableTab === 'open' ? 'market-tabs__item--active' : ''
									}`}
									type="button"
									name="open"
									onClick={handleChangeCurrentTableTab}
								>
									{String(L.translate('Trade.Spot.SpotHistoryTables.open_orders_tab_name'))} (
									{totalOpenOrders})
								</button>
								<button
									className={`market-tabs__item ${
										currentTableTab === 'closed' ? 'market-tabs__item--active' : ''
									}`}
									type="button"
									name="closed"
									onClick={handleChangeCurrentTableTab}
								>
									{String(L.translate('Trade.Spot.SpotHistoryTables.order_history_tab_name'))}
								</button>
								<button
									className={`market-tabs__item ${
										currentTableTab === 'trades' ? 'market-tabs__item--active' : ''
									}`}
									type="button"
									name="trades"
									onClick={handleChangeCurrentTableTab}
								>
									{String(L.translate('Trade.Spot.SpotHistoryTables.trade_history_tab_name'))}
								</button>
							</div>
							<div className="checkbox checkbox--margin-none">
								<label className="checkbox__label">
									<input
										type="checkbox"
										className="hidden"
										checked={otherPairsIsHide}
										onChange={handleChangeOtherPairsIsHide}
									/>
									<span className=" checkbox__item">
										<span className="checkbox__item-icon">
											<span className="icon-Checkbox" />
										</span>
									</span>
									<span className="checkbox__text">
										{String(L.translate('Trade.Spot.SpotHistoryTables.hide_other_pairs_checkbox'))}
									</span>
								</label>
							</div>
						</div>
						{authIsAuthenticated ? (
							currentTable[currentTableTab as keyof typeof currentTable]
						) : (
							<div className="table-history-login-register-wrapper">
								<LoginOrRegister />
							</div>
						)}
					</div>
				</div>
			</SocketWithPrivateTopicConnectWrapper>
		</SocketWithPrivateTopicConnectWrapper>
	);
};

export default SpotHistoryTables;
