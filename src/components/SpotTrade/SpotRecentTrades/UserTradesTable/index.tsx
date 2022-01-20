import { FC } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getSpotUserTradesIsLoad } from 'redux/reducers/spotTrade/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { getFirstPartPairCode, getLastPartPairCode } from 'services/utils/tradingPairHelpers';
import Loader from 'ui/Loader';
import UserTradesTableItem from '../UserTradesTableItem';
import { IUserTradesTableProps } from './types';

// ================================================:
const UserTradesTable: FC<IUserTradesTableProps> = ({ data }) => {
	const currentPair = useSelector(getCurrentPair);
	const userTradesIsLoad = useSelector(getSpotUserTradesIsLoad);

	return (
		<>
			<div className="table-header">
				<div className="tr">
					<div className="td">
						<span className="table-header__name">
							{String(L.translate('Trade.Spot.SpotRecentTrades.UserTradesColumnTitles.price_name'))}
							({getLastPartPairCode(currentPair || '')})
						</span>
					</div>
					<div className="td">
						<span className="table-header__name">
							{String(
								L.translate('Trade.Spot.SpotRecentTrades.UserTradesColumnTitles.amount_name'),
							)}
							({getFirstPartPairCode(currentPair || '')})
						</span>
					</div>
					<div className="td td--right">
						<span className="table-header__name">
							{String(L.translate('Trade.Spot.SpotRecentTrades.UserTradesColumnTitles.time_name'))}
						</span>
					</div>
				</div>
			</div>
			<div className="table-body">
				{userTradesIsLoad && !data && (
					<div className="recent-trades-loader-wrapper">
						<Loader />
					</div>
				)}

				{!userTradesIsLoad &&
					data &&
					data.map((el) => <UserTradesTableItem data={el} key={el.id} />)}
			</div>
		</>
	);
};

export default UserTradesTable;
