import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	exportWalletsCryptoHistory,
	getWalletsCryptoHistoryRequest,
} from 'redux/reducers/wallets/reducer';
import { getWalletsCryptoHistoryList, getWalletsList } from 'redux/reducers/wallets/selectors';
import { DebounceInput } from 'react-debounce-input';
import THDropdown from 'ui/THDropdown';
import THAssetDropdown from 'ui/THAssetDropdown';
import THTimeDropdown from 'ui/THTimeDropdown';
import { IWalletItem, IWalletsCryptoHistoryRequestData } from 'redux/reducers/wallets/types';
import Pagination from 'ui/Pagination';
import CryptoTable from './CryptoTable';

// ==========================================:
const CryptoHistory: FC = () => {
	const dispatch = useDispatch();

	const walletsCryptoHistoryList = useSelector(getWalletsCryptoHistoryList);
	const walletsList = useSelector(getWalletsList);

	const [searchTxID, setSearchTxID] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const [selectType, setSelectType] = useState<string>('All');
	const typeOptions = ['All', 'Withdrawal', 'Deposit'];

	const [selectTime, setSelectTime] = useState<number>(30);
	const timeOptions = [7, 30, 90];

	const [selectAsset, setSelectAsset] = useState<IWalletItem | string>('All');

	const [selectStatus, setSelectStatus] = useState<string>('All');
	const statusOptions = ['All', 'Success', 'Pending', 'Rejected'];

	const totalPages = walletsCryptoHistoryList?.last_page || 1;

	const handleTypeSelect = (value: string) => {
		setSelectType(value);
		setCurrentPage(1);
		setSearchTxID('');
	};

	const handleTimeSelect = (value: number) => {
		setSelectTime(value);
		setCurrentPage(1);
		setSearchTxID('');
	};

	const handleAssetSelect = (value: IWalletItem | string) => {
		setSelectAsset(value);
		setCurrentPage(1);
		setSearchTxID('');
	};

	const handleStatusSelect = (value: string) => {
		setSelectStatus(value);
		setCurrentPage(1);
		setSearchTxID('');
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		setSearchTxID('');
	};

	const handleResetClick = () => {
		setSelectType('All');
		setSelectStatus('All');
		setSelectTime(30);
		setSelectAsset('All');
		setSelectStatus('All');
	};

	const handleExportHistoryClick = () => {
		if (walletsCryptoHistoryList?.data?.length) {
			const requestWalletsCryptoHistoryData: IWalletsCryptoHistoryRequestData = {
				params: {
					per_page: 10,
					current_page: currentPage,
					export: true,
				},
			};

			if (typeof selectAsset === 'object' && selectAsset.id) {
				requestWalletsCryptoHistoryData.params.wallet_id = selectAsset.id;
			}

			if (selectTime !== 30) {
				requestWalletsCryptoHistoryData.params.past_days = selectTime;
			}

			if (selectStatus !== 'All') {
				requestWalletsCryptoHistoryData.params.status = selectStatus?.toLowerCase();
			}

			if (selectType !== 'All') {
				requestWalletsCryptoHistoryData.params.transaction_type = selectType?.toLowerCase();
			}

			if (searchTxID.trim()) {
				requestWalletsCryptoHistoryData.params.tx_id = searchTxID.trim();
			}

			dispatch(exportWalletsCryptoHistory(requestWalletsCryptoHistoryData));
		}
	};

	const handleSearchTransaction = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearchTxID(value);

		const requestWalletsCryptoHistoryData: IWalletsCryptoHistoryRequestData = {
			params: {
				per_page: 10,
				current_page: currentPage,
			},
		};

		if (value?.trim()) {
			requestWalletsCryptoHistoryData.params.tx_id = value?.trim();
			handleResetClick();

			dispatch(getWalletsCryptoHistoryRequest(requestWalletsCryptoHistoryData));
		}
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [selectType]);

	useEffect(() => {
		if (searchTxID) return;

		const requestWalletsCryptoHistoryData: IWalletsCryptoHistoryRequestData = {
			params: {
				per_page: 10,
				current_page: currentPage,
			},
		};

		if (typeof selectAsset === 'object' && selectAsset.id) {
			requestWalletsCryptoHistoryData.params.wallet_id = selectAsset.id;
		}

		if (selectTime !== 30) {
			requestWalletsCryptoHistoryData.params.past_days = selectTime;
		}

		if (selectStatus !== 'All') {
			requestWalletsCryptoHistoryData.params.status = selectStatus?.toLowerCase();
		}

		if (selectType !== 'All') {
			requestWalletsCryptoHistoryData.params.transaction_type = selectType?.toLowerCase();
		}

		dispatch(getWalletsCryptoHistoryRequest(requestWalletsCryptoHistoryData));
	}, [dispatch, selectAsset, selectStatus, selectType, selectTime, currentPage, searchTxID]);

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
						<p className="select-block__name">Asset</p>
						<THAssetDropdown
							value={selectAsset}
							onChange={handleAssetSelect}
							options={walletsList?.filter((wallet) => wallet.asset.type !== 'fiat') || []}
						/>
					</div>
					<div className="transactions__select-block select-block">
						<p className="select-block__name">Status</p>
						<THDropdown
							value={selectStatus}
							onChange={handleStatusSelect}
							options={statusOptions}
						/>
					</div>
					<div className="transactions__input select-block">
						<p className="select-block__name">TxID</p>
						<div className="input-wrapper">
							<DebounceInput
								debounceTimeout={200}
								type="text"
								placeholder="Enter TxID"
								className="input-item"
								name="tx_id"
								value={searchTxID}
								onChange={handleSearchTransaction}
							/>
						</div>
					</div>
				</div>

				<div className="transactions__filter-left transactions__filter-left-wrapper">
					<button
						className="transactions__filter-btn reset-btn"
						type="button"
						onClick={handleResetClick}
					>
						Reset filter
					</button>
					<button
						className="transactions__filter-btn transactions__filter-btn--convert"
						type="button"
						onClick={handleExportHistoryClick}
					>
						<span className="btn-cover-icon icon-arrow" />
						Export crypto history
					</button>
				</div>
			</div>
			<div className="create-offer__main create-offer__main--transaction">
				<div className="table-block">
					<div className="table-wrapper">
						<div className="transactions-table table transactions-table--crypto">
							<CryptoTable data={walletsCryptoHistoryList?.data || []} />

							{totalPages > 1 && (
								<Pagination
									pageCount={totalPages}
									forcePage={currentPage - 1}
									onPageChange={handlePageChange}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CryptoHistory;
