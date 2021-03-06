import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { getWalletsList } from 'redux/reducers/wallets/selectors';
import { IWalletItem } from 'redux/reducers/wallets/types';
import THAssetDropdown from 'ui/THAssetDropdown';
import THDropdown from 'ui/THDropdown';
import THTimeDropdown from 'ui/THTimeDropdown';

const DepositWithdrawalFiatHistory: FC = () => {
	const walletsList = useSelector(getWalletsList);

	const [selectType, setSelectType] = useState<string>('Withdrawal');
	const typeOptions = ['Withdrawal', 'Deposit'];

	const [selectTime, setSelectTime] = useState<number>(30);
	const timeOptions = [7, 30, 90];

	const [selectAsset, setSelectAsset] = useState<IWalletItem | string>('All');

	const handleTypeSelect = (value: string) => {
		setSelectType(value);
	};

	const handleTimeSelect = (value: number) => {
		setSelectTime(value);
	};

	const handleAssetSelect = (value: IWalletItem | string) => {
		setSelectAsset(value);
	};

	const handleResetClick = () => {
		setSelectTime(30);
		setSelectAsset('All');
	};

	return (
		<>
			<div className="transactions__filter transactions-history-filter">
				<div className="transactions__filter-right">
					<div className="transactions__select-block select-block">
						<p className="select-block__name">Type</p>
						<THDropdown value={selectType} onChange={handleTypeSelect} options={typeOptions} />
					</div>

					<div className="transactions__select-block select-block">
						<p className="select-block__name">Time</p>
						<THTimeDropdown value={selectTime} onChange={handleTimeSelect} options={timeOptions} />
					</div>
					<div className="transactions__select-block select-block">
						<p className="select-block__name">Fiat</p>
						<THAssetDropdown
							value={selectAsset}
							onChange={handleAssetSelect}
							options={walletsList?.filter((wallet) => wallet.asset.type === 'fiat') || []}
						/>
					</div>
				</div>

				<div className="transactions__filter-left">
					<button className="transactions__filter-btn" type="button" onClick={handleResetClick}>
						Reset filter
					</button>
				</div>
			</div>
			<div className="create-offer__main create-offer__main--transaction">
				<div className="table-block">
					<div className="table-wrapper">
						<div className="transactions-table table transactions-table--fiat">
							<div className="table-header">
								<div className="tr">
									<div className="td">
										<div className="td-name">
											<p>Time</p>
										</div>
									</div>
									<div className="td">
										<div className="td-name">
											<p>Currency</p>
										</div>
									</div>
									<div className="td">
										<div className="td-name">
											<p>Payment Method</p>
										</div>
									</div>
									<div className="td">
										<div className="td-name">
											<p>Indicated Amount</p>
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
											<p>Status</p>
										</div>
									</div>
								</div>
							</div>
							<div className="table-body">
								<div className="tr">
									<div className="td">
										<p className="td-hidden-name">Time</p>
										<p>2021-11-03 16:47:53</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Currency</p>
										<p>USD</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Payment Method</p>
										<p>PayPal</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Indicated Amount</p>
										<p>3234</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Fee</p>
										<div className="permissions">
											<p>12.34</p>
										</div>
									</div>
									<div className="td">
										<p className="td-hidden-name">Amount</p>
										<div className="permissions">
											<p>304 404</p>
										</div>
									</div>
									<div className="td td-status">
										<p className="td-hidden-name">Status</p>
										<p className="status-completed">Completed</p>
									</div>
								</div>
								<div className="tr">
									<div className="td">
										<p className="td-hidden-name">Time</p>
										<p>2021-11-03 16:47:53</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Currency</p>
										<p>USD</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Payment Method</p>
										<p>PayPal</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Indicated Amount</p>
										<p>3234</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Fee</p>
										<div className="permissions">
											<p>12.34</p>
										</div>
									</div>
									<div className="td">
										<p className="td-hidden-name">Amount</p>
										<div className="permissions">
											<p>304 404</p>
										</div>
									</div>
									<div className="td td-status">
										<p className="td-hidden-name">Status</p>
										<p className="status-completed">Completed</p>
									</div>
								</div>
								<div className="tr">
									<div className="td">
										<p className="td-hidden-name">Time</p>
										<p>2021-11-03 16:47:53</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Currency</p>
										<p>USD</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Payment Method</p>
										<p>PayPal</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Indicated Amount</p>
										<p>3234</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Fee</p>
										<div className="permissions">
											<p>12.34</p>
										</div>
									</div>
									<div className="td">
										<p className="td-hidden-name">Amount</p>
										<div className="permissions">
											<p>304 404</p>
										</div>
									</div>
									<div className="td td-status">
										<p className="td-hidden-name">Status</p>
										<p className="status-completed">Completed</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepositWithdrawalFiatHistory;
