import { FC } from 'react';
import PhoneMockup from 'assets/img/content/phone-mockup.png';

// ==========================================:
const BitanicaTextTrage: FC = () => {
	return (
		<div className="section">
			<div className="container">
				<div className="info-content">
					<div className="info-content__main">
						<h3 className="section-title section-title--big">Trade anywhere 24/7</h3>
						<p className="info-content__desc">
							App and Website offer you an easy and quick way to start trading
						</p>
						<div className="store-links">
							<a href="/" className="store-link">
								<div className="store-link__img">
									<span className="store-link__icon icon-apple" />
								</div>
								<div className="store-link__info">
									<span className="store-link__title">
										Download from{' '}
										<span className="store-link__title store-link__title--name">Appstore</span>
									</span>
								</div>
							</a>
							<a href="/" className="store-link">
								<div className="store-link__img store-link__img--green">
									<span className="store-link__icon icon-arrow3" />
								</div>
								<div className="store-link__info">
									<span className="store-link__title">
										Download from{' '}
										<span className="store-link__title store-link__title--name">Google Play</span>
									</span>
								</div>
							</a>
						</div>
					</div>
					<div className="info-content__img info-content__img--phone">
						<img src={PhoneMockup} alt="Phone mockup" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BitanicaTextTrage;
