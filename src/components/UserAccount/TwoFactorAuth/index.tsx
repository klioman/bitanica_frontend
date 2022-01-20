import { FC } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { getCheck2faEnablesLoader } from 'redux/reducers/settings/selectors';
import Loader from 'ui/Loader';
import Google2faActions from './Google2faActions';

// ==========================================:
const TwoFactorAuth: FC = () => {
	const check2faEnablesLoader = useSelector(getCheck2faEnablesLoader);

	return (
		<>
			<div className="main-content__header">
				<h2 className="section-title">
					{String(L.translate('Account.TwoFactorAuth.two_factor_auth_page_title'))}
				</h2>
			</div>

			{check2faEnablesLoader ? (
				<div className="check-2fa-enable-wrapper">
					<Loader />
				</div>
			) : (
				<Google2faActions />
			)}
		</>
	);
};

export default TwoFactorAuth;
