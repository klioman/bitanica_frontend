import { FC } from 'react';

// ================================================:
const SocialList: FC = () => {
	return (
		<div className="social footer__social">
			<a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="social__link">
				<span className="social__icon icon-facebook-f" />
			</a>
			<a href="https://twitter.com/" target="_blank" rel="noreferrer" className="social__link">
				<span className="social__icon icon-twitter" />
			</a>
			<a
				href="https://www.instagram.com/"
				target="_blank"
				rel="noreferrer"
				className="social__link"
			>
				<span className="social__icon icon-instagram" />
			</a>
			<a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="social__link">
				<span className="social__icon icon-youtube" />
			</a>
			<a href="https://vk.com/" target="_blank" rel="noreferrer" className="social__link">
				<span className="social__icon social__icon--small icon-vk" />
			</a>
			<a
				href="https://web.telegram.org/z/"
				target="_blank"
				rel="noreferrer"
				className="social__link"
			>
				<span className="social__icon icon-telegram-plane" />
			</a>
		</div>
	);
};

export default SocialList;
