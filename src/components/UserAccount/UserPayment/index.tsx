import { FC } from 'react';

// ==========================================:
const UserPayment: FC = () => {
	return (
		<>
			<div className="main-content__header">
				<h2 className="section-title">Payment</h2>
			</div>
			<div className="content-block content-block--padding-none">
				<nav className="tabs-nav">
					<button type="button" className="tabs-nav__item tabs-nav__item--active">
						P2P
					</button>
					<button type="button" className="tabs-nav__item">
						Buy Crypto
					</button>
					<button type="button" className="tabs-nav__item">
						Withdraw
					</button>
				</nav>
				<div className="content-block__main content-block__main--padding">
					<p className="desc">
						P2P payment methods: When you sell cryptocurrencies, the payment method added will be
						displayed to buyer as options to accept payment, please ensure that the account owner’s
						name is consistent with your verified name on Bitanica. You can add up to 3 payment
						methods.
					</p>
					<div className="payment-empty">
						<span className="payment-empty__icon icon-card-add2" />
						<span className="payment-empty__title">You have not added any payment methods</span>
						<button type="button" className="button button--second-type payment-empty__btn">
							Add a payment method
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserPayment;
