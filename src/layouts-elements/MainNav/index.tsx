import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAuthIsAuthenticated } from 'redux/reducers/auth/selectors';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';

// ==========================================:
const MainNav: FC = () => {
	const currentPair = useSelector(getCurrentPair);
	const isAuth = useSelector(getAuthIsAuthenticated);

	const transformCurrrentPair = currentPair?.toUpperCase();

	return (
		<nav className="main-nav header__nav">
			<ul className="main-nav__list">
				<li className="main-nav__item">
					<NavLink to={`/spot/${String(transformCurrrentPair)}`} className="main-nav__link">
						Spot trading
					</NavLink>
				</li>
				<li className="main-nav__item">
					<a href="/" className="main-nav__link">
						Margine trading
					</a>
				</li>
				<li className="main-nav__item">
					<a href="/" className="main-nav__link">
						P2P Trading
					</a>
				</li>
				{isAuth && (
					<li className="main-nav__item">
						<NavLink to="/convert" className="main-nav__link">
							Convert
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default MainNav;
