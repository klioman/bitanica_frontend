import { FC, useEffect } from 'react';
import Dashboard from 'layouts/Dashboard';

import { useDispatch } from 'react-redux';
import { getWalletsRequest } from 'redux/reducers/wallets/reducer';
import SpotAndFiat from 'components/SpotAndFiat';
import { getAssetPairsRequest } from 'redux/reducers/assetPairs/reducer';

// ==========================================:
const FiatAndSpot: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getWalletsRequest());
		dispatch(getAssetPairsRequest());
	}, [dispatch]);

	return (
		<Dashboard title="Fiat and spot">
			<SpotAndFiat />
		</Dashboard>
	);
};

export default FiatAndSpot;
