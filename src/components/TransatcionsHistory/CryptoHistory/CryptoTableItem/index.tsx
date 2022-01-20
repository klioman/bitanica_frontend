/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
	getLocaleDateFromTimestamp,
	getLocaleTimeFromTimestamp,
} from 'services/utils/dateAndTimeHelpers';
import { notificationContainer } from 'services/utils/notificationContainer';
import { trimComment, trimAddress, trimTransactionHash } from 'services/utils/trimComment';
import { ICryptoTableItemProps } from './types';

const CryptoTableItem: FC<ICryptoTableItemProps> = ({ data }) => {
	const handleTransactionUrlCopy = () => {
		notificationContainer('Transaction url copied successfully!', 'info');
	};

	const handleCommentCopy = () => {
		notificationContainer('Comment copied successfully!', 'info');
	};

	const handleAddressCopy = () => {
		notificationContainer('Address copied successfully!', 'info');
	};

	const statusClasses = {
		processed: 'status-completed',
		confirmed: 'status-completed',
		rejected: 'status-failed',
		unconfirmed: 'status-pending',
		pending: 'status-pending',
		in_progress: 'status-pending',
	};

	return (
		<div className="tr" key={data?.id}>
			<div className="td">
				<p className="td-hidden-name">Time</p>
				<p>
					{getLocaleDateFromTimestamp(data?.created_at)}{' '}
					{getLocaleTimeFromTimestamp(data?.created_at)}
				</p>
			</div>
			<div className="td">
				<p className="td-hidden-name">Type</p>
				<p>{data?.transaction_type}</p>
			</div>
			<div className="td">
				<p className="td-hidden-name">Asset</p>
				<p>{data?.asset_code?.toUpperCase()}</p>
			</div>
			<div className="td">
				<p className="td-hidden-name">Network</p>
				<p>{data?.network?.toUpperCase()}</p>
			</div>
			<div className="td">
				<p className="td-hidden-name">Fee</p>
				<p>{Number(data?.fee)}</p>
			</div>
			<div className="td">
				<p className="td-hidden-name">Amount</p>
				<div className="permissions">
					<p>{Number(data?.amount)}</p>
				</div>
			</div>
			<div className="td">
				<p className="td-hidden-name">Destination</p>
				{data?.address ? (
					<>
						<span className="td-address">{trimAddress(data?.address)}</span>
						<CopyToClipboard text={data?.address} onCopy={handleAddressCopy}>
							<button className="transaction-copy icon-fi_copy" type="button" />
						</CopyToClipboard>
					</>
				) : (
					'--------'
				)}
			</div>
			<div className="td td-status">
				<p className="td-hidden-name">Status</p>
				<p className={statusClasses[data?.status as keyof typeof statusClasses]}>{data?.status}</p>
			</div>
			<div className="td">
				<p className="td-hidden-name">Comment</p>
				{data?.comment ? (
					<>
						<span className="td-address">{trimComment(data?.comment)}</span>
						<CopyToClipboard text={data?.comment} onCopy={handleCommentCopy}>
							<button className="transaction-copy icon-fi_copy" type="button" />
						</CopyToClipboard>
					</>
				) : (
					'--------'
				)}
			</div>
			<div className="td td--id">
				<p className="td-hidden-name">TxID</p>
				<div>
					<p>
						{data?.hash ? (
							<>
								<span className="td-address">{trimTransactionHash(data?.hash)}</span>
								<CopyToClipboard text={data?.tx_url} onCopy={handleTransactionUrlCopy}>
									<button className="transaction-copy icon-fi_copy" type="button" />
								</CopyToClipboard>
							</>
						) : (
							'--------'
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CryptoTableItem;
