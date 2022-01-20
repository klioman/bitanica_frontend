import { useState, FC, ChangeEvent } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { setWorkspaceSettings } from 'redux/reducers/tradingSettings/reducer';
import { getWorkspaceSettings } from 'redux/reducers/tradingSettings/selectors';
import { IChangeSpotMarketSettingsProps } from './types';

const SpotMarketSettingsModal: FC<IChangeSpotMarketSettingsProps> = ({ openModal, closeModal }) => {
	const workspaceSettings = useSelector(getWorkspaceSettings);
	const dispatch = useDispatch();

	const [orderBookSection, setOrderBookSection] = useState(workspaceSettings?.orderBookSection);
	const [tradingPairsSection, setTradingPairsSection] = useState(
		workspaceSettings?.tradingPairsSection,
	);

	const saveIsDisabled =
		workspaceSettings?.orderBookSection === orderBookSection &&
		workspaceSettings?.tradingPairsSection === tradingPairsSection;

	const handleChangeOrderBookSectionSettings = (e: ChangeEvent<HTMLInputElement>) => {
		setOrderBookSection(e.target.checked);
	};
	const handleChangeTradingPairsSectionSettings = (e: ChangeEvent<HTMLInputElement>) => {
		setTradingPairsSection(e.target.checked);
	};

	const handleSaveWorkspaceSettings = () => {
		dispatch(
			setWorkspaceSettings({
				orderBookSection,
				tradingPairsSection,
			}),
		);

		closeModal();
	};

	return (
		<Popup open={openModal} closeOnDocumentClick onClose={closeModal} closeOnEscape>
			<div className="popup-window">
				<button className="popup-close" type="button" onClick={closeModal}>
					<span className="popup-close__icon icon-close" />
				</button>
				<div className="popup-window__inside">
					<div className="popup popup--small">
						<div className="popup-header">
							<p className="popup-header__title">
								{String(L.translate('Trade.Spot.SpotMarketSettingsModal.modal_title'))}
							</p>
						</div>
						<div className="popup-body popup-body--margin-none">
							<div className="popup-text popup-text--center">
								<p>
									{String(L.translate('Trade.Spot.SpotMarketSettingsModal.modal_subtitle_001'))}
									<br />
									{String(L.translate('Trade.Spot.SpotMarketSettingsModal.modal_subtitle_002'))}
								</p>
							</div>
							<div className="workspace-settings">
								<div className="workspace-settings__item">
									<span className="workspace-settings__title">
										{String(
											L.translate(
												'Trade.Spot.SpotMarketSettingsModal.modal_orderbook_switched_text',
											),
										)}
									</span>
									<div className="switch switch--type2">
										<label className="switch__label">
											<input
												type="checkbox"
												className="hidden"
												checked={orderBookSection}
												name="orderBookSection"
												onChange={handleChangeOrderBookSectionSettings}
											/>
											<span className="switch__toggler" />
										</label>
									</div>
								</div>
								<div className="workspace-settings__item">
									<span className="workspace-settings__title">
										{String(
											L.translate(
												'Trade.Spot.SpotMarketSettingsModal.modal_asset_pairs_switched_text',
											),
										)}
									</span>
									<div className="switch switch--type2">
										<label className="switch__label">
											<input
												type="checkbox"
												className="hidden"
												name="tradingPairsSection"
												checked={tradingPairsSection}
												onChange={handleChangeTradingPairsSectionSettings}
											/>
											<span className="switch__toggler" />
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="popup-submit popup-submit--sb">
							<button
								className="button button--second-grey button--full-width"
								type="button"
								onClick={closeModal}
							>
								{String(L.translate('Trade.Spot.SpotMarketSettingsModal.modal_cancel_button'))}
							</button>
							<button
								className="button button--full-width"
								type="button"
								onClick={handleSaveWorkspaceSettings}
								disabled={saveIsDisabled}
							>
								{String(L.translate('Trade.Spot.SpotMarketSettingsModal.modal_save_button'))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default SpotMarketSettingsModal;
