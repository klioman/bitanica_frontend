/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import SpotTrade from 'components/SpotTrade';
import Trading from 'layouts/Trading';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAssetPairsFeesAndLimitsRequest,
	getAssetPairsRequest,
} from 'redux/reducers/assetPairs/reducer';
import { getAssetsRequest } from 'redux/reducers/assets/reducer';
import {
	getOrderBookRequest,
	getRecentTradesRequest,
	getUserTradesRequest,
} from 'redux/reducers/spotTrade/reducer';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';
import { useHistory } from 'react-router';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getWalletsRequest } from 'redux/reducers/wallets/reducer';

// ==========================================:
const SpotTradingPage: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const currentPair = useSelector(getCurrentPair);
	const authIsAuthenticated = useSelector(getAuthIsAuthenticated);

	useEffect(() => {
		dispatch(getAssetsRequest());
		dispatch(getAssetPairsRequest());
		dispatch(getAssetPairsFeesAndLimitsRequest());
	}, [dispatch]);

	useEffect(() => {
		const transformCurrrentPair = currentPair?.toUpperCase();

		history.push(`/spot/${transformCurrrentPair}`);

		dispatch(
			getOrderBookRequest({
				pair: currentPair,
				params: {
					limit: 100,
				},
			}),
		);

		dispatch(
			getRecentTradesRequest({
				pair: currentPair,
				params: {
					limit: 100,
				},
			}),
		);

		if (authIsAuthenticated) {
			dispatch(getWalletsRequest());

			dispatch(
				getUserTradesRequest({
					params: {
						pair: currentPair,
						current_page: 1,
						per_page: 100,
					},
				}),
			);
		}
	}, [dispatch, currentPair, authIsAuthenticated]);

	return (
		<Trading title="Spot Trading">
			<SpotTrade />
		</Trading>
	);
};

export default SpotTradingPage;
