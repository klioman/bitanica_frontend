import SocketWithTopicConnectWrapper from 'components/SocketWithTopicConnectWrapper';
import { FC, MouseEvent, useState } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getSpotRecentTrades, getSpotUserTrades } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair, getWorkspaceSettings } from 'redux/reducers/tradingSettings/selectors';
import LoginOrRegister from 'ui/LoginOrRegister';
import RecentTradesTable from './RecentTradesTable';
import UserTrades from './UserTrades';

const SpotRecentTrades: FC = () => {
	const workspaceSettings = useSelector(getWorkspaceSettings);
	const recentTrades = useSelector(getSpotRecentTrades);
	const currentPair = useSelector(getCurrentPair);
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);
	const userTrades = useSelector(getSpotUserTrades);

	const [currentTradesTab, setCurrentTradesTab] = useState('market');

	const handleChangeCurrentTrades = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setCurrentTradesTab(name);
	};

	return (
		<SocketWithTopicConnectWrapper topicName={`trades:${String(currentPair)}`}>
			<div className="recent-trades">
				<div className="market-tabs">
					<button
						className={`market-tabs__item ${
							currentTradesTab === 'market' ? 'market-tabs__item--active' : ''
						}`}
						type="button"
						name="market"
						onClick={handleChangeCurrentTrades}
					>
						{String(L.translate('Trade.Spot.SpotRecentTrades.market_trade_tab_name'))}
					</button>
					<button
						className={`market-tabs__item ${
							currentTradesTab === 'users' ? 'market-tabs__item--active' : ''
						}`}
						type="button"
						name="users"
						onClick={handleChangeCurrentTrades}
					>
						{String(L.translate('Trade.Spot.SpotRecentTrades.user_trade_tab_name'))}
					</button>
				</div>
				<div
					className={`table table--stats recent-trades__table ${
						!workspaceSettings?.orderBookSection && workspaceSettings?.tradingPairsSection
							? 'recent-trades__table--small'
							: ''
					} `}
				>
					{currentTradesTab === 'market' ? <RecentTradesTable data={recentTrades} /> : null}

					{currentTradesTab === 'users' && !authIsAuthenticated && (
						<div
							className={`user-trades-wrapper ${
								!workspaceSettings?.orderBookSection && workspaceSettings?.tradingPairsSection
									? 'user-trades-wrapper--small'
									: ''
							} `}
						>
							<div className="user-trades-history-login-register-wrapper">
								<LoginOrRegister />
							</div>
						</div>
					)}

					{currentTradesTab === 'users' && authIsAuthenticated && (
						<UserTrades data={userTrades?.data} />
					)}
				</div>
			</div>
		</SocketWithTopicConnectWrapper>
	);
};

export default SpotRecentTrades;
