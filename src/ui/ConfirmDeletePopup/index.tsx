/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import L from 'i18n-react';
import Popup from 'reactjs-popup';
import { IConfirmDeletePopupProps } from './types';

// ================================================:
const ConfirmDeletePopup: FC<IConfirmDeletePopupProps> = ({
	title = '',
	bodyMessage = '',
	openModal,
	closeModal,
	handleDelete,
}) => {
	return (
		<Popup open={openModal} closeOnDocumentClick onClose={closeModal} closeOnEscape>
			<div className="popup-window">
				<button className="popup-close" type="button" onClick={closeModal}>
					<span className="popup-close__icon icon-close" />
				</button>
				<div className="popup-window__inside">
					<div className="popup popup--small">
						<div className="popup-header">
							<p className="popup-header__title">{title}</p>
						</div>
						<div className="popup-body popup-body--margin-none">
							<div className="popup-text popup-text--center">
								<p>{bodyMessage}</p>
							</div>
						</div>
						<div className="popup-submit popup-submit--sb">
							<button
								className="button button--second-grey button--full-width"
								type="button"
								onClick={handleDelete}
							>
								{String(L.translate('Base.Modals.ConfirmDeletePopup.yes_button'))}
							</button>
							<button className="button button--full-width" type="button" onClick={closeModal}>
								{String(L.translate('Base.Modals.ConfirmDeletePopup.no_button'))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default ConfirmDeletePopup;
