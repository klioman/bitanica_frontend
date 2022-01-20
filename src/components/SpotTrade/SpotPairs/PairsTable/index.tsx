import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { getAssetPairsIsLoad, getAssetPairsList } from 'redux/reducers/assetPairs/selectors';
import Loader from 'ui/Loader';
import PairsTableItem from '../PairsTableItem';
import { IPairsTableProps } from './types';

// ================================================:
const PairsTable: FC<IPairsTableProps> = ({ workspaceSettings, searchData, currentAssetData }) => {
	const { orderBookSection, tradingPairsSection } = workspaceSettings;
	const assetPairsList = useSelector(getAssetPairsList);
	const assetPairsIsLoad = useSelector(getAssetPairsIsLoad);

	const filteredAssetPairsBySearchData = useMemo(() => {
		if (currentAssetData !== 'all' && searchData) {
			return assetPairsList?.filter(
				(pair) =>
					pair.code.toLowerCase().includes(currentAssetData) &&
					pair.code.toLowerCase().replace('_', '/').includes(searchData.toLowerCase().trim()),
			);
		}

		if (currentAssetData !== 'all') {
			return assetPairsList?.filter((pair) => pair.code.toLowerCase().includes(currentAssetData));
		}

		return assetPairsList?.filter((pair) => {
			return pair.code.toLowerCase().replace('_', '/').includes(searchData.toLowerCase().trim());
		});
	}, [assetPairsList, searchData, currentAssetData]);

	return (
		<div
			className={`table table--stats favorites-trades__table ${
				!orderBookSection && tradingPairsSection ? 'favorites-trades__table--small' : ''
			}`}
		>
			<div className="table-header">
				<div className="tr">
					<div className="td">
						<button type="button" className="table-header__name">
							{String(L.translate('Trade.Spot.SpotPairs.PairsTableColumnTitles.pair_name'))}
							<div className="td-sort">
								<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
								<span className="td-sort__icon td-sort__icon--green icon-arrow2" />
							</div>
						</button>
					</div>
					<div className="td">
						<button type="button" className="table-header__name">
							{String(L.translate('Trade.Spot.SpotPairs.PairsTableColumnTitles.price_name'))}
							<div className="td-sort">
								<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
								<span className="td-sort__icon td-sort__icon--green icon-arrow2" />
							</div>
						</button>
					</div>
					<div className="td td--right">
						<button type="button" className="table-header__name">
							{String(L.translate('Trade.Spot.SpotPairs.PairsTableColumnTitles.change_name'))}
							<div className="td-sort">
								<span className="td-sort__icon td-sort__icon--rotate icon-arrow2" />
								<span className="td-sort__icon td-sort__icon--green icon-arrow2" />
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className="table-body spot-pair-table-body">
				{filteredAssetPairsBySearchData?.length && !assetPairsIsLoad
					? filteredAssetPairsBySearchData.map((pair) => (
							<PairsTableItem key={pair.id} pair={pair} />
					  ))
					: null}

				{!filteredAssetPairsBySearchData?.length && !assetPairsIsLoad && (
					<div className="asset-pairs-loader-wrapper">
						{String(L.translate('Trade.Spot.SpotPairs.no_pairs_data'))}
					</div>
				)}

				{assetPairsIsLoad && !filteredAssetPairsBySearchData?.length && (
					<div className="asset-pairs-loader-wrapper">
						<Loader />
					</div>
				)}
			</div>
		</div>
	);
};

export default PairsTable;
