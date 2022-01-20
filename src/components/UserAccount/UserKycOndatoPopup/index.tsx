import OndatoKycStartForm from 'components/Forms/OndatoKycStartForm';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { getKycOndatoURLRequest } from 'redux/reducers/kyc/reducer';
import { IIKycOndatoURLRequestData } from 'redux/reducers/kyc/types';
import { IUserKycOndatoPopupProps } from './types';

const UserKycOndatoPopup: FC<IUserKycOndatoPopupProps> = ({
	openModal,
	closeModal,
	setIosLink,
}) => {
	const dispatch = useDispatch();

	const ondatoKycStart = (data: IIKycOndatoURLRequestData) => {
		dispatch(getKycOndatoURLRequest({ ...data, setIosLink }));

		closeModal();
	};

	return (
		<Popup open={openModal} closeOnDocumentClick onClose={closeModal} closeOnEscape>
			<div className="popup-window">
				<button className="popup-close" type="button" onClick={closeModal}>
					<span className="popup-close__icon icon-close" />
				</button>
				<div className="popup-window__inside">
					<div className="popup">
						<div className="popup-header">
							<p className="popup-header__title">Identity Verification</p>
						</div>
						<div className="popup-body popup-body--margin-none">
							<div className="popup-text popup-text--center">
								<p>Fill the fields below to start verification process</p>
							</div>
						</div>

						<OndatoKycStartForm startOndatoKycSubmit={ondatoKycStart} />
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default UserKycOndatoPopup;
