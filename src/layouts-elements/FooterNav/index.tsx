import { FC } from 'react';

// ==========================================:
const FooterNav: FC = () => {
	return (
		<nav className="footer-nav">
			<ul className="footer-nav__list">
				<li className="footer-nav__item">
					<a href="/" className="footer-nav__link">
						Spot trading
					</a>
				</li>
				<li className="footer-nav__item">
					<a href="/" className="footer-nav__link">
						Margine trading
					</a>
				</li>
				<li className="footer-nav__item">
					<a href="/" className="footer-nav__link">
						P2P Trading
					</a>
				</li>
				<li className="footer-nav__item">
					<a href="/" className="footer-nav__link">
						Convert
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNav;
