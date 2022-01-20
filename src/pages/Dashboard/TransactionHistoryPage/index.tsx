import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TransatcionsHistory from 'components/TransatcionsHistory';
import { getWalletsRequest } from 'redux/reducers/wallets/reducer';
import History from 'layouts/History';

// ==========================================:
const TransactionHistoryPage: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getWalletsRequest());
	}, [dispatch]);

	return (
		<History title="Transaction History">
			<TransatcionsHistory />
		</History>
	);
};

export default TransactionHistoryPage;
