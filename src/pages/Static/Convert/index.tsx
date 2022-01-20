import { FC, useEffect } from 'react';
import Convert from 'layouts/Convert';
import ConvertForm from 'components/Forms/ConvertForm';
import { useDispatch } from 'react-redux';
import { getWalletsRequest } from 'redux/reducers/wallets/reducer';
import {
	getAssetPairsFeesAndLimitsRequest,
	getAssetPairsRequest,
} from 'redux/reducers/assetPairs/reducer';

// ==========================================:
const ConvertPage: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getWalletsRequest());
		dispatch(getAssetPairsRequest());
		dispatch(getAssetPairsFeesAndLimitsRequest());
	}, [dispatch]);

	return (
		<Convert title="Convert">
			<ConvertForm />
		</Convert>
	);
};

export default ConvertPage;
