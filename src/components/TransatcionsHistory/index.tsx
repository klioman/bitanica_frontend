import { FC, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import ConvertHistory from 'components/ConvertHistory';
import DepositWithdrawalFiatHistory from 'components/DepositWithdrawalFiatHistory';
import TransferHistory from 'components/TransferHistory';
import CryptoHistory from './CryptoHistory';

// ================================================:
const TransatcionsHistory: FC = () => {
	const [currentHistoryType, setCurrentHistoryType] = useState('crypto');

	const handleCurrentHistoryType = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setCurrentHistoryType(name);
	};
	return (
		<div className="content-block content-block--flex content-block--padding-none content-block--border content-block--min-height">
			<div className="create-offer create-offer--transactions">
				<div className="create-offer__header">
					<Link to="/fiat-and-spot" className="back-step">
						<div className="back-step__img">
							<span className="back-step__arrow icon-arrow" />
						</div>
						<span className="back-step__text">Transaction History</span>
					</Link>

					<div className="transactions">
						<div className="transactions__tags">
							<button
								className={`transactions__tags-item ${
									currentHistoryType === 'crypto' ? 'active' : ''
								}`}
								type="button"
								name="crypto"
								onClick={handleCurrentHistoryType}
							>
								<span>Crypto</span>
							</button>
							<button
								className={`transactions__tags-item ${
									currentHistoryType === 'fiat' ? 'active' : ''
								}`}
								type="button"
								name="fiat"
								onClick={handleCurrentHistoryType}
							>
								<span>Fiat</span>
							</button>
							<button
								className={`transactions__tags-item ${
									currentHistoryType === 'transfer' ? 'active' : ''
								}`}
								type="button"
								name="transfer"
								onClick={handleCurrentHistoryType}
							>
								<span>Transfer</span>
							</button>
							<button
								className={`transactions__tags-item ${
									currentHistoryType === 'convert' ? 'active' : ''
								}`}
								type="button"
								name="convert"
								onClick={handleCurrentHistoryType}
							>
								<span>Convert</span>
							</button>
						</div>
					</div>
				</div>
				{currentHistoryType === 'crypto' && <CryptoHistory />}
				{currentHistoryType === 'fiat' && <DepositWithdrawalFiatHistory />}
				{currentHistoryType === 'transfer' && <TransferHistory />}
				{currentHistoryType === 'convert' && <ConvertHistory />}
			</div>
		</div>
	);
};

export default TransatcionsHistory;
