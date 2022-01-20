import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { getDisplayDisable2faForm } from 'redux/reducers/settings/selectors';
import { disable2faRequest } from 'redux/reducers/settings/reducer';
import Google2faForm from 'components/Forms/Google2faForm';
import { IGoogle2faFormData } from 'components/Forms/Google2faForm/types';
import DisableInfo from 'components/UserAccount/TwoFactorAuth/DisableInfo';

// ==========================================:
const DisableBlock: FC = () => {
	const dispatch = useDispatch();
	const displayDisable2faForm = useSelector(getDisplayDisable2faForm);

	const handleGoogle2faSubmit = (value: IGoogle2faFormData) => {
		dispatch(disable2faRequest(value));
	};

	return (
		<>
			{displayDisable2faForm ? (
				<div className="content-block content-block--medium">
					<div className="steps">
						<div className="steps-item">
							<div className="steps-item__main">
								<Google2faForm
									google2faSubmit={handleGoogle2faSubmit}
									btnText={String(L.translate('Forms.Google2fa.google_2fa_form_btn_disable'))}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<DisableInfo />
			)}
		</>
	);
};

export default DisableBlock;
