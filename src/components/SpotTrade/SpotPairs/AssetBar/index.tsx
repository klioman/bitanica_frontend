import { FC, MouseEvent } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getAssetsList } from 'redux/reducers/assets/selectors';
import { IAssetBarProps } from './types';

const AssetBar: FC<IAssetBarProps> = ({
	currentAssetTab,
	handleFilteredAssetPairs,
	selectDropdown,
	setSelectDropdown,
}) => {
	const assetsList = useSelector(getAssetsList);

	const assetsListForHeader = assetsList?.slice(0, 6);
	const assetsListForDropDown = assetsList?.slice(6);

	const handleSelectAsset = (e: MouseEvent<HTMLButtonElement>) => {
		handleFilteredAssetPairs(e);

		setSelectDropdown(false);
	};

	return (
		<div className="favorites-trades__sort">
			<button type="button">
				<span className="favorites-trades__sort-icon icon-star" />
			</button>
			<div className="favorites-trades__sort-list">
				<button
					className={`favorites-trades__sort-item ${
						currentAssetTab === 'all' ? 'favorites-trades__sort-item--active' : ''
					}`}
					type="button"
					name="all"
					onClick={handleFilteredAssetPairs}
				>
					{String(L.translate('Trade.Spot.SpotPairs.all_pairs_title'))}
				</button>
				{assetsListForHeader?.length
					? assetsListForHeader?.map((asset) => (
							<button
								key={asset.id}
								className={`favorites-trades__sort-item ${
									currentAssetTab === asset.code ? 'favorites-trades__sort-item--active' : ''
								}`}
								type="button"
								name={asset.code}
								onClick={handleFilteredAssetPairs}
							>
								{asset.code.toUpperCase()}
							</button>
					  ))
					: null}
			</div>
			<button
				className="drop-btn favorites-trades__drop"
				type="button"
				onClick={() => {
					setSelectDropdown(!selectDropdown);
				}}
			>
				<span className="drop-btn__icon icon-arrow2" />
			</button>
			{selectDropdown && assetsListForDropDown?.length ? (
				<div className="drop-currency">
					<div className="drop-currency__list">
						{assetsListForDropDown.map((asset) => (
							<button
								key={asset.id}
								type="button"
								className={`drop-currency__item ${
									currentAssetTab === asset.code ? 'drop-currency__item--active' : ''
								}`}
								name={asset.code}
								onClick={handleSelectAsset}
							>
								{asset.code.toUpperCase()}
							</button>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default AssetBar;
