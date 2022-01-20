import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import MainNav from 'layouts-elements/MainNav';
import AuthHeader from 'layouts-elements/Header/AuthHeader';
import StaticHeader from 'layouts-elements/Header/StaticHeader';
import AppLogo from 'ui/AppLogo';

// ==========================================:
const Header: FC = () => {
	const isAuth = useSelector(getAuthIsAuthenticated);

	return (
		<header className="header">
			<div className="header__side">
				<AppLogo />
				<MainNav />
			</div>
			<div className="header__side">
				{isAuth ? <AuthHeader /> : <StaticHeader />}

				<div className="lang">
					<div className="lang__header">
						<div className="lang__img">
							<span className="icon-US">
								<span className="path1" />
								<span className="path2" />
								<span className="path3" />
								<span className="path4" />
							</span>
						</div>
						<span className="lang__current">EN</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
