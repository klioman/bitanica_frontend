import { FC } from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import mobilePic from 'assets/img/content/mobile-pic.png';
import itemCripto01 from 'assets/img/icons/item-cripto/item-crypto_01.svg';
import itemCripto02 from 'assets/img/icons/item-cripto/item-crypto_02.svg';
import itemCripto03 from 'assets/img/icons/item-cripto/item-crypto_03.svg';
import itemCripto04 from 'assets/img/icons/item-cripto/item-crypto_04.svg';

// ==========================================:
const BuySellCrypto: FC = () => {
	return (
		<div className="hero">
			<div className="hero__content">
				<div className="container">
					<div className="hero__info wow animate__animated animate__fadeInLeft">
						<h1 className="hero__title ">{L.translate('HomePage.BuySellCrypto.title')}</h1>
						<p className="hero__desc">{L.translate('HomePage.BuySellCrypto.subtitle')}</p>
						<Link to="/registration" className="button button--shadow-type hero__register-btn">
							Register now
						</Link>
					</div>
					<div className="hero__img wow animate__animated animate__fadeInUp">
						<img src={mobilePic} alt="" />
					</div>
				</div>
			</div>
			<div className="stats-panel">
				<div className="container">
					<div className="stats-panel__list">
						<div className="item-stats">
							<div className="item-stats__header">
								<div className="item-stats__icon">
									<img src={itemCripto01} alt="" />
								</div>
								<span className="item-stats__name">DOGE/USDT</span>
								<span className="item-stats__value">-6.41%</span>
							</div>
							<span className="item-stats__num">0.2466</span>
							<span className="item-stats__total">$ 0,345363</span>
						</div>
						<div className="item-stats">
							<div className="item-stats__header">
								<div className="item-stats__icon">
									<img src={itemCripto02} alt="" />
								</div>
								<span className="item-stats__name">1INCH/USDT</span>
								<span className="item-stats__value item-stats__value--green">+32.41%</span>
							</div>
							<span className="item-stats__num">5.2466</span>
							<span className="item-stats__total">$ 5,24</span>
						</div>
						<div className="item-stats">
							<div className="item-stats__header">
								<div className="item-stats__icon">
									<img src={itemCripto03} alt="" />
								</div>
								<span className="item-stats__name">ADA/USDT</span>
								<span className="item-stats__value item-stats__value--green">+3332.41%</span>
							</div>
							<span className="item-stats__num">1.6566</span>
							<span className="item-stats__total">$ 1,64</span>
						</div>
						<div className="item-stats">
							<div className="item-stats__header">
								<div className="item-stats__icon">
									<img src={itemCripto04} alt="" />
								</div>
								<span className="item-stats__name">MATIC/USDT</span>
								<span className="item-stats__value item-stats__value--green">+22.41%</span>
							</div>
							<span className="item-stats__num">1.6566</span>
							<span className="item-stats__total">$ 1,64</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BuySellCrypto;
