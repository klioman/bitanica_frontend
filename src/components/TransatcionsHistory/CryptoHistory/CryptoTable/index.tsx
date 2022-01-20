/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getWalletsCryptoHistoryIsLoad } from 'redux/reducers/wallets/selectors';
import Loader from 'ui/Loader';
import CryptoTableItem from '../CryptoTableItem';
import { ICryptoTableProps } from './types';

// ==========================================:
const CryptoTable: FC<ICryptoTableProps> = ({ data }) => {
	const walletsCryptoHistoryListLoader = useSelector(getWalletsCryptoHistoryIsLoad);

	return (
		<>
			<div className="table-header">
				<div className="tr">
					<div className="td">
						<div className="td-name">
							<p>Time</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Type</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Asset</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Network</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Fee</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Amount</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Destination</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Status</p>
						</div>
					</div>
					<div className="td">
						<div className="td-name">
							<p>Comment</p>
						</div>
					</div>
					<div className="td td--id">
						<div className="td-name td-name--action">
							<p>TxID</p>
						</div>
					</div>
				</div>
			</div>
			<div className="table-body">
				{walletsCryptoHistoryListLoader && (
					<div className="transaction-history-loader-wrapper">
						<Loader />
					</div>
				)}

				{data?.length && !walletsCryptoHistoryListLoader
					? data?.map((item, idx) => <CryptoTableItem key={idx} data={item} />)
					: null}

				{!data?.length && !walletsCryptoHistoryListLoader && (
					<div className="transaction-history-loader-wrapper">You have no crypto transactions!</div>
				)}
			</div>
		</>
	);
};

export default CryptoTable;
