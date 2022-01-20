import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import L from 'i18n-react';

// ==========================================:
const AccountSidebar: FC = () => {
	return (
		<aside className="sidebar">
			<nav className="sidebar-nav">
				<ul className="sidebar-nav__list">
					<NavLink to="/general-settings" activeClassName="sidebar-nav__item--active" exact>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-settings" />
							<span className="sidebar-nav__text">
								{String(L.translate('Account.AccountSettings.general_account_settings'))}
							</span>
						</span>
					</NavLink>
					<NavLink to="/auth-2fa" activeClassName="sidebar-nav__item--active" exact>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-scan" />
							<span className="sidebar-nav__text">
								{String(L.translate('Account.TwoFactorAuth.two_factor_auth_page_app_title'))}
							</span>
						</span>
					</NavLink>
					<NavLink to="/notifications" activeClassName="sidebar-nav__item--active" exact>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-directbox-notif" />
							<span className="sidebar-nav__text">Notifications</span>
						</span>
					</NavLink>
					<NavLink to="/payments" activeClassName="sidebar-nav__item--active" exact>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-card-add" />
							<span className="sidebar-nav__text">Payments</span>
						</span>
					</NavLink>
				</ul>
			</nav>
		</aside>
	);
};

export default AccountSidebar;
