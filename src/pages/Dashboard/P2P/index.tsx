import { FC } from 'react';
import Dashboard from 'layouts/Dashboard';

// ==========================================:
const P2P: FC = () => {
	return (
		<Dashboard title="P2P">
			<>
				<div className="main-content__header">
					<h2 className="section-title">P2P</h2>
					<button type="button" className="hide-btn">
						<span className="hide-btn__icon text-type icon-eye" />
						<span className="hide-btn__text">Hide Balance</span>
					</button>
					<div className="section-nav">
						<a href="/" className="button button--nav">
							P2P Trading
						</a>
					</div>
				</div>
				<div className="content-block">
					<div className="balance-list">
						<div className="balance-item">
							<span className="balance-item__title">Estimate Value:</span>
							<span className="balance-item__value">
								<span className="balance-item__value-num">0.39152020</span> BTC <br />≈ $33,394.87
							</span>
						</div>
					</div>
				</div>
				<div className="content-block content-block--padding-part">
					<div className="balance-section">
						<div className="balance-block">
							<div className="table table--balance table--p2p-wallet">
								<div className="table-header">
									<div className="tr">
										<div className="td">
											<button type="button" className="table-header__name table-header__name--btn">
												Coin{' '}
												<div className="td-sort">
													<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
													<span className="td-sort__icon icon-arrow2" />
												</div>
											</button>
										</div>
										<div className="td">
											<button type="button" className="table-header__name table-header__name--btn">
												Available assets
												<div className="td-sort">
													<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
													<span className="td-sort__icon icon-arrow2" />
												</div>
											</button>
										</div>
										<div className="td">
											<button type="button" className="table-header__name table-header__name--btn">
												Frozen{' '}
												<div className="td-sort">
													<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
													<span className="td-sort__icon icon-arrow2" />
												</div>
											</button>
										</div>
										<div className="td">
											<button type="button" className="table-header__name table-header__name--btn">
												Total assets{' '}
												<div className="td-sort">
													<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
													<span className="td-sort__icon icon-arrow2" />
												</div>
											</button>
										</div>
										<div className="td">
											<span className="table-header__name">Action</span>
										</div>
									</div>
								</div>
								<div className="table-body">
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/uan.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520
												<span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
									<div className="tr">
										<div className="td">
											<div className="balance-currency">
												<div className="balance-currency__img">
													<img src="images/content/aed.svg" alt="" />
												</div>
												<div className="balance-currency__info">
													<span className="balance-currency__title">SOL</span>
													<span className="balance-currency__desc">Solana</span>
												</div>
											</div>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">9.12000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">0.00000000</span>
										</div>
										<div className="td">
											<span className="td-name td-name--regular">
												0.00000520 <span className="td-name td-name--subtext">≈ $0.342987</span>
											</span>
										</div>
										<div className="td">
											<div className="link-group">
												<a href="/" className="link link--regular">
													Buy
												</a>
												<a href="/" className="link link--regular">
													Sell
												</a>
												<a href="/" className="link link--regular">
													Transfer
												</a>
												<a href="/" className="link link--regular">
													Send
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="table-footer">
									<ul className="pagination">
										<li className="arrow arrow--left disabled">
											<a href="/">
												<span className="arrow__icon icon-arrow-5" />
											</a>
										</li>
										<li className="active">
											<a href="/">1</a>
										</li>
										<li>
											<a href="/">2</a>
										</li>
										<li>
											<a href="/">3</a>
										</li>
										<li>
											<a href="/">4</a>
										</li>
										<li>
											<a href="/">5</a>
										</li>
										<li>
											<a href="/">...</a>
										</li>
										<li>
											<a href="/">199</a>
										</li>
										<li className="arrow">
											<a href="/">
												<span className="arrow__icon icon-arrow-5" />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</Dashboard>
	);
};

export default P2P;
