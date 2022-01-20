import { FC } from 'react';

// ==========================================:
const FooterStaticNav: FC = () => {
	return (
		<nav className="footer-nav footer-nav--right">
			<ul className="footer-nav__list">
				<li className="footer-nav__item">
					<a href="/" className="footer-nav__link">
						Blog
					</a>
				</li>
				<li className="footer-nav__item">
					<a href="/" className="footer-nav__link">
						Help center
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default FooterStaticNav;
