import { FC, useEffect } from 'react';
import TradingChart from 'components/TradingChart';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { setCurrentPair } from 'redux/reducers/tradingSettings/reducer';
import { getPairFromLocationPath } from 'services/utils/getPairFromLocationPath';

// ==========================================:
const ChartPage: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const pairSearch = getPairFromLocationPath(location?.pathname);

	useEffect(() => {
		if (pairSearch) {
			dispatch(setCurrentPair(pairSearch));
		}
	}, [dispatch, pairSearch]);

	return <TradingChart />;
};

export default ChartPage;
