import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getWalletsIsLoad } from 'redux/reducers/wallets/selectors';
import Loader from 'ui/Loader';
import SortedButton from 'ui/SortedButton';
import SpotAndFiatItem from '../SpotAndFiatItem';
import { ISpotAndFiatSortingTableProps } from './types';

// ================================================:
const SpotAndFiatSortingTable: FC<ISpotAndFiatSortingTableProps> = ({ data, balancesIsHide }) => {
	const [sortMagnitude, setSortMagnitude] = useState('');
	const [sortType, setSortType] = useState('');

	const waletsIsLoad = useSelector(getWalletsIsLoad);

	const sortedData = useMemo(() => {
		if (!data) return [];

		if (sortMagnitude === 'desc') {
			return [...data].sort((a, b) => {
				const sortFirstItem =
					a.asset[sortType as keyof typeof a.asset] || Number(a[sortType as keyof typeof a]);
				const sortSecondItem =
					b.asset[sortType as keyof typeof b.asset] || Number(b[sortType as keyof typeof b]);

				return sortFirstItem > sortSecondItem ? 1 : -1;
			});
		}

		if (sortMagnitude === 'asc') {
			return [...data].sort((a, b) => {
				const sortFirstItem =
					a.asset[sortType as keyof typeof a.asset] || Number(a[sortType as keyof typeof a]);
				const sortSecondItem =
					b.asset[sortType as keyof typeof b.asset] || Number(b[sortType as keyof typeof b]);

				return sortFirstItem < sortSecondItem ? 1 : -1;
			});
		}

		return data;
	}, [data, sortMagnitude, sortType]);

	return (
		<div className="table table--balance">
			<div className="table-header">
				<div className="tr">
					<div className="td">
						<SortedButton
							title="Coin"
							sortType={sortType}
							sortOrderType="code"
							setSortType={setSortType}
							sortMagnitude={sortMagnitude}
							setSortMagnitude={setSortMagnitude}
						/>
					</div>
					<div className="td">
						<SortedButton
							title="Total"
							sortType={sortType}
							sortOrderType="total"
							setSortType={setSortType}
							sortMagnitude={sortMagnitude}
							setSortMagnitude={setSortMagnitude}
						/>
					</div>
					<div className="td">
						<SortedButton
							title="Available"
							sortType={sortType}
							sortOrderType="balance"
							setSortType={setSortType}
							sortMagnitude={sortMagnitude}
							setSortMagnitude={setSortMagnitude}
						/>
					</div>
					<div className="td">
						<SortedButton
							title="In order"
							sortType={sortType}
							sortOrderType="frozen_balance"
							setSortType={setSortType}
							sortMagnitude={sortMagnitude}
							setSortMagnitude={setSortMagnitude}
						/>
					</div>
					<div className="td">
						<SortedButton
							title="BTC value"
							sortType={sortType}
							sortOrderType="btc_value"
							setSortType={setSortType}
							sortMagnitude={sortMagnitude}
							setSortMagnitude={setSortMagnitude}
						/>
					</div>
					<div className="td">
						<span className="table-header__name">Action</span>
					</div>
				</div>
			</div>
			<div className="table-body">
				{waletsIsLoad ? (
					<div className="spot-and-fiat-wallets-table-loader-wrapper">
						<Loader />
					</div>
				) : null}

				{!waletsIsLoad && sortedData?.length
					? sortedData?.map((item) => (
							<SpotAndFiatItem key={item.id} data={item} balancesIsHide={balancesIsHide} />
					  ))
					: null}

				{!waletsIsLoad && sortedData?.length === 0 && (
					<span className="table-empty">No wallets found.</span>
				)}
			</div>
			<div className="table-footer" />
		</div>
	);
};

export default SpotAndFiatSortingTable;
