import { FC } from 'react';
import itemCrypto01 from 'assets/img/icons/item-cripto/item-crypto_01.svg';
import itemCrypto02 from 'assets/img/icons/item-cripto/item-crypto_02.svg';
import itemCrypto03 from 'assets/img/icons/item-cripto/item-crypto_03.svg';
import itemCrypto04 from 'assets/img/icons/item-cripto/item-crypto_04.svg';

// ==========================================:
const BitanicaCoinInfo: FC = () => {
	return (
		<div className="section">
			<div className="container">
				<div className="info-content">
					<div className="crypto-cards wow animate__animated animate__fadeInLeft">
						<div className="crypto-cards__list">
							<div className="crypto-card">
								<div className="crypto-card__header">
									<div className="crypto-card__img">
										<img src={itemCrypto01} alt="item crypto 01" />
									</div>
									<div className="crypto-card__info">
										<span className="crypto-card__name">Doge Coin</span>
										<span className="crypto-card__currency">DOGE</span>
									</div>
								</div>
								<div className="crypto-card__stats">
									<span className="crypto-card__total">$0.379</span>
									<span className="crypto-card__value">5.26% ($0.02)</span>
								</div>
							</div>
							<div className="crypto-card">
								<div className="crypto-card__header">
									<div className="crypto-card__img">
										<img src={itemCrypto02} alt="item crypto 02" />
									</div>
									<div className="crypto-card__info">
										<span className="crypto-card__name">Bitcoin</span>
										<span className="crypto-card__currency">BTC</span>
									</div>
								</div>
								<div className="crypto-card__stats">
									<span className="crypto-card__total">$37,321.176</span>
									<span className="crypto-card__value">91.40% ($321.78)</span>
								</div>
							</div>
							<div className="crypto-card">
								<div className="crypto-card__header">
									<div className="crypto-card__img">
										<img src={itemCrypto03} alt="item crypto 03" />
									</div>
									<div className="crypto-card__info">
										<span className="crypto-card__name">Chainlink</span>
										<span className="crypto-card__currency">LINK</span>
									</div>
								</div>
								<div className="crypto-card__stats">
									<span className="crypto-card__total">$0.589</span>
									<span className="crypto-card__value">4.25% ($0.28)</span>
								</div>
							</div>
							<div className="crypto-card">
								<div className="crypto-card__header">
									<div className="crypto-card__img">
										<img src={itemCrypto04} alt="item crypto 04" />
									</div>
									<div className="crypto-card__info">
										<span className="crypto-card__name">Ripple</span>
										<span className="crypto-card__currency">XRP</span>
									</div>
								</div>
								<div className="crypto-card__stats">
									<span className="crypto-card__total">$659.32</span>
									<span className="crypto-card__value">50% ($321.21)</span>
								</div>
							</div>
						</div>
					</div>
					<div className="info-content__main wow animate__animated animate__fadeInRight">
						<h3 className="section-title section-title--big">
							Your Access to the
							<br /> Top Coin Markets
						</h3>
						<p className="info-content__desc">
							Capitalize on trends and trade with confidence through our expansive marketplace
							listings.
						</p>
						<p className="info-content__subtitle">Buy, sell and trade over 500 markets</p>
						<a href="/" className="button button--shadow-type">
							View Markets
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BitanicaCoinInfo;
