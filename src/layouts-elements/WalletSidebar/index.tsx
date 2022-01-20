import { FC } from 'react';
import { NavLink } from 'react-router-dom';

// ==========================================:
const WalletSidebar: FC = () => {
	return (
		<aside className="sidebar">
			<nav className="sidebar-nav">
				<ul className="sidebar-nav__list">
					<NavLink
						to="/fiat-and-spot"
						className="sidebar-nav__item"
						activeClassName="sidebar-nav__item--active"
						exact
					>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-money-recive" />
							<span className="sidebar-nav__text">Fiat and Spot</span>
						</span>
					</NavLink>
					<NavLink
						to="/p2p"
						className="sidebar-nav__item"
						activeClassName="sidebar-nav__item--active"
						exact
					>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-user" />
							<span className="sidebar-nav__text">P2P</span>
						</span>
					</NavLink>
					<li className="sidebar-nav__item">
						<a href="/" className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-directbox-notif" />
							<span className="sidebar-nav__text">Notifications</span>
						</a>
					</li>
					<NavLink
						to="/transaction-history"
						className="sidebar-nav__item"
						activeClassName="sidebar-nav__item--active"
						exact
					>
						<span className="sidebar-nav__link">
							<span className="sidebar-nav__icon icon-user" />
							<span className="sidebar-nav__text">Transaction History</span>
						</span>
					</NavLink>
				</ul>
			</nav>
		</aside>
	);
};

export default WalletSidebar;
