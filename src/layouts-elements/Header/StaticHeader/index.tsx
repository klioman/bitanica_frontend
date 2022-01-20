import { FC } from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';

// ==========================================:
const StaticHeader: FC = () => {
	return (
		<>
			<div className="user-nav">
				<Link to="/login" className="button button--buy button--third-grey button--user-nav">
					{String(L.translate('LoginPage.login_btn'))}
				</Link>
				<Link to="/registration" className="button button--buy button--user-nav">
					{String(L.translate('RegistrPage.registr_btn'))}
				</Link>
			</div>
			<div className="select header__select">
				<a href="/" className="select__current">
					<span className="select__icon icon-receive-square" />
					Download
				</a>
			</div>
		</>
	);
};

export default StaticHeader;
