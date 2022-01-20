import { FC } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getSpotRecentTradesIsLoad } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { getFirstPartPairCode, getLastPartPairCode } from 'services/utils/tradingPairHelpers';
import Loader from 'ui/Loader';
import RecentTradesTableItem from '../RecentTradesTableItem';
import { IRecentTradesTableProps } from './types';

const RecentTradesTable: FC<IRecentTradesTableProps> = ({ data }) => {
	const currentPair = useSelector(getCurrentPair);
	const recentTradesIsLoad = useSelector(getSpotRecentTradesIsLoad);

	return (
		<>
			<div className="table-header">
				<div className="tr">
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotRecentTrades.RecentTradesColumnTitles.price_name'),
							)}
							({getLastPartPairCode(currentPair || '')})
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotRecentTrades.RecentTradesColumnTitles.amount_name'),
							)}
							({getFirstPartPairCode(currentPair || '')})
						</span>
					</div>
					<div className="td td--right">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotRecentTrades.RecentTradesColumnTitles.time_name'),
							)}
						</span>
					</div>
				</div>
			</div>
			<div className="table-body spot-recent-trades__table">
				{recentTradesIsLoad && !data && (
					<div className="recent-trades-loader-wrapper">
						<Loader />
					</div>
				)}

				{!recentTradesIsLoad &&
					data &&
					data.map((el) => <RecentTradesTableItem data={el} key={el.id} />)}
			</div>
		</>
	);
};

export default RecentTradesTable;
