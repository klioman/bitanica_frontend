import { FC } from 'react';

// ==========================================:
const BitanicaTextInfo: FC = () => {
	return (
		<div className="section">
			<div className="container">
				<h3 className="section-title section-title--big section-title--centered wow animate__animated animate__fadeInUp">
					We are at your side
				</h3>
				<div className="section__content">
					<div className="advantages-list wow animate__animated animate__slideInUp">
						<div className="advantages-item">
							<div className="advantages-item__img">
								<span className="advantages-item__icon icon-messages-2" />
							</div>
							<span className="advantages-item__title">Customer Service Available 24/7</span>
							<p className="advantages-item__desc">
								Don&apos;t know what Bitcoin is? Not sure how to trade or how to monitor the
								markets? You can ask any questions to the support service.
							</p>
						</div>
						<div className="advantages-item">
							<div className="advantages-item__img">
								<span className="advantages-item__icon icon-vuesax-linear-shield-tick-converted" />
							</div>
							<span className="advantages-item__title">Strong security</span>
							<p className="advantages-item__desc">
								Protection against DDoS attacks, full data encryption, cryptocurrency cold storage,
								and compliance with PCI DSS standards to safeguard your funds
							</p>
						</div>
						<div className="advantages-item">
							<div className="advantages-item__img">
								<span className="advantages-item__icon icon-vuesax-linear-empty-wallet-converted" />
							</div>
							<span className="advantages-item__title">Payment options</span>
							<p className="advantages-item__desc">
								Multiple payment methods:
								<br />
								Visa, Mastercard, bank transfer
								<br />
								(SWIFT, SEPA, ACH, Faster Payments), cryptocurrency
							</p>
						</div>
						<div className="advantages-item">
							<div className="advantages-item__img">
								<span className="advantages-item__icon icon-percent" />
							</div>
							<span className="advantages-item__title">Competitive commissions</span>
							<p className="advantages-item__desc">
								Reasonable fees for takers and makers, special conditions for high-volume traders,
								and strong offers for market makers
							</p>
						</div>
						<div className="advantages-item">
							<div className="advantages-item__img">
								<span className="advantages-item__icon icon-Iconly-Light-Paper-converted" />
							</div>
							<span className="advantages-item__title">Reliable order execution</span>
							<p className="advantages-item__desc">
								Advanced order matching algorithms, a high-liquidity order book, favorable
								conditions for market making, high-frequency trading, and scalping strategies
							</p>
						</div>
						<div className="advantages-item">
							<div className="advantages-item__img">
								<span className="advantages-item__icon icon-Password" />
							</div>
							<span className="advantages-item__title">Range of API solutions</span>
							<p className="advantages-item__desc">
								WebSocket, REST API and FIX API for automated trading based on the needs of
								individuals and institutions
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BitanicaTextInfo;
