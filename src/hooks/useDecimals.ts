import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAssetPairs } from 'redux/reducers/assetPairs/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';

const useDecimals = () => {
	const currentPair = useSelector(getCurrentPair);
	const assetPairs = useSelector(getAssetPairs);

	const decimals = useMemo(() => {
		return assetPairs.assetPairs?.length && currentPair
			? assetPairs.assetPairs.find((assetPair) => assetPair.code === currentPair)
			: undefined;
	}, [assetPairs.assetPairs, currentPair]);

	return [decimals?.view_decimal || 0];
};

export default useDecimals;
