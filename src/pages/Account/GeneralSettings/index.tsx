import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import { userSettingsRequest } from 'redux/reducers/settings/reducer';
import Account from 'layouts/Account';
import UserGeneralSettings from 'components/UserAccount/UserGeneralSettings';

// ================================================:
const GeneralSettings: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userSettingsRequest());
	}, [dispatch]);

	return (
		<Account title={String(L.translate('Account.AccountSettings.general_account_settings'))}>
			<UserGeneralSettings />
		</Account>
	);
};

export default GeneralSettings;
