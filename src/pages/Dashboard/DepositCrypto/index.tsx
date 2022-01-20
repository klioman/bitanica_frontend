import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { getWalletsRequest } from 'redux/reducers/wallets/reducer';
import Dashboard from 'layouts/Dashboard';
import CreateDepositCrypto from 'components/CreateDepositCrypto';
import { getWalletsList } from 'redux/reducers/wallets/selectors';

// ==========================================:
const DepositCrypto: FC = () => {
	const dispatch = useDispatch();
	const walletsList = useSelector(getWalletsList);

	useEffect(() => {
		if (!walletsList) {
			dispatch(getWalletsRequest());
		}
	}, [dispatch, walletsList]);

	return (
		<Dashboard title={String(L.translate('DepositCrypto.deposit_crypto_page_title'))}>
			<CreateDepositCrypto />
		</Dashboard>
	);
};

export default DepositCrypto;
