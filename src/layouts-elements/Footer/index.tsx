import { FC } from 'react';
import FooterNav from 'layouts-elements/FooterNav';
import FooterStaticNav from 'layouts-elements/FooterStaticNav';
import FooterCopy from 'layouts-elements/FooterCopy';
import SocialList from 'ui/SocialList';
import AppFooterLogo from 'ui/AppFooterLogo';

// ==========================================:
const Footer: FC = () => {
	return (
		<footer className="footer">
			<div className="footer__main">
				<AppFooterLogo />
				<FooterNav />
				<FooterStaticNav />
			</div>
			<div className="footer__bottom">
				<FooterCopy />
				<SocialList />
			</div>
		</footer>
	);
};

export default Footer;
