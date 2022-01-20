import SocketWithTopicConnectWrapper from 'components/SocketWithTopicConnectWrapper';
import { ChangeEvent, MouseEvent, FC, useState } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { getWorkspaceSettings } from 'redux/reducers/tradingSettings/selectors';
import AssetBar from './AssetBar';
import PairsTable from './PairsTable';

const SpotPairs: FC = () => {
	const workspaceSettings = useSelector(getWorkspaceSettings);

	const [search, setSearch] = useState('');
	const [currentAssetTab, setCurrentAssetTab] = useState('all');
	const [selectDropdown, setSelectDropdown] = useState(false);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearch(value);
	};

	const handleFilteredAssetPairs = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setCurrentAssetTab(name);
		setSelectDropdown(false);
	};

	return (
		<SocketWithTopicConnectWrapper topicName="assets_pairs">
			<div className="favorites-trades">
				<div className="search">
					<div className="input input--margin-small">
						<div className="input-wrapper">
							<input
								className="input-item input-item--small input-item--right-icon"
								type="text"
								placeholder={String(
									L.translate('Trade.Spot.SpotPairs.search_pair_placeholder_text'),
								)}
								value={search}
								onChange={handleSearch}
							/>
							<button className="search-btn" type="button">
								<span className="search-btn__icon icon-search-normal" />
							</button>
						</div>
					</div>
				</div>
				<div className="favorites-trades__block">
					<AssetBar
						currentAssetTab={currentAssetTab}
						handleFilteredAssetPairs={handleFilteredAssetPairs}
						selectDropdown={selectDropdown}
						setSelectDropdown={setSelectDropdown}
					/>
					<PairsTable
						workspaceSettings={workspaceSettings}
						searchData={search}
						currentAssetData={currentAssetTab}
					/>
				</div>
			</div>
		</SocketWithTopicConnectWrapper>
	);
};

export default SpotPairs;
