import { FC } from 'react';
import currency01 from 'assets/img/icons/сryptocurrencies/currency_01.svg';
import currency02 from 'assets/img/icons/сryptocurrencies/currency_02.svg';
import currency03 from 'assets/img/icons/сryptocurrencies/currency_03.svg';
import currency04 from 'assets/img/icons/сryptocurrencies/currency_04.svg';
import currency05 from 'assets/img/icons/сryptocurrencies/currency_05.svg';
import chart01 from 'assets/img/icons/сryptocurrencies/chart_01.svg';
import chart02 from 'assets/img/icons/сryptocurrencies/chart_02.svg';
import chart03 from 'assets/img/icons/сryptocurrencies/chart_03.svg';
import chart04 from 'assets/img/icons/сryptocurrencies/chart_04.svg';
import chart05 from 'assets/img/icons/сryptocurrencies/chart_05.svg';

// ==========================================:
const TopCryptocurrencies: FC = () => {
	return (
		<div className="section">
			<div className="container">
				<h3 className="section-title section-title--big section-title--centered wow animate__animated animate__fadeInUp">
					Top cryptocurrencies
				</h3>
				<div className="section__content wow animate__animated animate__zoomIn">
					<div className="table">
						<div className="table-header">
							<div className="tr">
								<div className="td">
									<span className="table-header__name">Currency</span>
								</div>
								<div className="td">
									<span className="table-header__name">Price</span>
								</div>
								<div className="td">
									<span className="table-header__name">24h change</span>
								</div>
								<div className="td">
									<span className="table-header__name">Chart</span>
								</div>
								<div className="td">
									<span className="table-header__name">Trade</span>
								</div>
							</div>
						</div>
						<div className="table-body">
							<div className="tr">
								<div className="td">
									<div className="item-stats">
										<div className="item-stats__header">
											<div className="item-stats__icon item-stats__icon--margin">
												<img src={currency01} alt="" />
											</div>
											<span className=" item-stats__name item-stats__name--padding">Bitcoin</span>
											<span className="item-stats__currency">BTC</span>
										</div>
									</div>
								</div>
								<div className="td">
									<span className="currency-num">$36,201.34</span>
								</div>
								<div className="td">
									<span className="currency-value">+1.71%</span>
								</div>
								<div className="td">
									<div className="currency-chart">
										<img src={chart01} alt="" />
									</div>
								</div>
								<div className="td">
									<button type="button" className="button button--trade">
										Trade
									</button>
								</div>
							</div>
							<div className="tr">
								<div className="td">
									<div className="item-stats">
										<div className="item-stats__header">
											<div className="item-stats__icon item-stats__icon--margin">
												<img src={currency02} alt="" />
											</div>
											<span className=" item-stats__name item-stats__name--padding">Ethereum</span>
											<span className="item-stats__currency">ETH</span>
										</div>
									</div>
								</div>
								<div className="td">
									<span className="currency-num">$2,605.95</span>
								</div>
								<div className="td">
									<span className="currency-value">+2.04%</span>
								</div>
								<div className="td">
									<div className="currency-chart">
										<img src={chart02} alt="" />
									</div>
								</div>
								<div className="td">
									<button type="button" className="button button--trade">
										Trade
									</button>
								</div>
							</div>
							<div className="tr">
								<div className="td">
									<div className="item-stats">
										<div className="item-stats__header">
											<div className="item-stats__icon item-stats__icon--margin">
												<img src={currency03} alt="" />
											</div>
											<span className=" item-stats__name item-stats__name--padding">
												Bitcoin Cash
											</span>
											<span className="item-stats__currency">BCH</span>
										</div>
									</div>
								</div>
								<div className="td">
									<span className="currency-num">$939.20</span>
								</div>
								<div className="td">
									<span className="currency-value currency-value--red">-0.74%</span>
								</div>
								<div className="td">
									<div className="currency-chart">
										<img src={chart03} alt="" />
									</div>
								</div>
								<div className="td">
									<button type="button" className="button button--trade">
										Trade
									</button>
								</div>
							</div>
							<div className="tr">
								<div className="td">
									<div className="item-stats">
										<div className="item-stats__header">
											<div className="item-stats__icon item-stats__icon--margin">
												<img src={currency04} alt="" />
											</div>
											<span className=" item-stats__name item-stats__name--padding">Ripple</span>
											<span className="item-stats__currency">XRP</span>
										</div>
									</div>
								</div>
								<div className="td">
									<span className="currency-num">$1.02</span>
								</div>
								<div className="td">
									<span className="currency-value">+1.20%</span>
								</div>
								<div className="td">
									<div className="currency-chart">
										<img src={chart04} alt="" />
									</div>
								</div>
								<div className="td">
									<button type="button" className="button button--trade">
										Trade
									</button>
								</div>
							</div>
							<div className="tr">
								<div className="td">
									<div className="item-stats">
										<div className="item-stats__header">
											<div className="item-stats__icon item-stats__icon--margin">
												<img src={currency05} alt="" />
											</div>
											<span className=" item-stats__name item-stats__name--padding">Chainlink</span>
											<span className="item-stats__currency">LINK</span>
										</div>
									</div>
								</div>
								<div className="td">
									<span className="currency-num">$30.56</span>
								</div>
								<div className="td">
									<span className="currency-value currency-value--red">-3.84%</span>
								</div>
								<div className="td">
									<div className="currency-chart">
										<img src={chart05} alt="" />
									</div>
								</div>
								<div className="td">
									<button type="button" className="button button--trade">
										Trade
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="table-footer">
						<a href="/" className="button button--all-currency">
							View all currency
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopCryptocurrencies;
