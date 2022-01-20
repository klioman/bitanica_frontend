import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import Account from 'layouts/Account';
import TwoFactorAuth from 'components/UserAccount/TwoFactorAuth';
import { check2faEnablesRequest } from 'redux/reducers/settings/reducer';

// ================================================:
const Auth2fa: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(check2faEnablesRequest());
	}, [dispatch]);

	return (
		<Account title={String(L.translate('Account.TwoFactorAuth.two_factor_auth_page_app_title'))}>
			<TwoFactorAuth />
		</Account>
	);
};

export default Auth2fa;
