import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { getChangePassLoader } from 'redux/reducers/settings/selectors';
import { changeUserPassRequest } from 'redux/reducers/settings/reducer';
import ChangePassForm from 'components/Forms/ChangePassForm';
import UserData from 'components/UserAccount/UserGeneralSettings/UserData';
import { IChangePassFormValue } from 'components/Forms/ChangePassForm/types';
import Loader from 'ui/Loader';

// ==========================================:
const UserGeneralSettings: FC = () => {
	const changePassLoader = useSelector(getChangePassLoader);
	const dispatch = useDispatch();

	const handleChangePassFormSubmit = (value: IChangePassFormValue) => {
		dispatch(changeUserPassRequest(value));
	};

	return (
		<>
			<div className="main-content__header">
				<h2 className="section-title">
					{String(L.translate('Account.AccountSettings.general_account_settings'))}
				</h2>
			</div>
			<div className="content-group">
				<UserData />

				<div className="content-block content-block--small change-passs-wrapper">
					<div className="content-block__header">
						<div className="content-block__title">
							<span className="content-block__title-icon icon-Lock" />
							<span className="content-block__title-text">
								{String(L.translate('Forms.ChangePassForm.change_pass_form_title'))}
							</span>
						</div>
					</div>
					<div className="content-block__main ">
						<ChangePassForm changePassFormSubmit={handleChangePassFormSubmit} />
						{changePassLoader && (
							<div className="auth-loader-wrapper">
								<Loader />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserGeneralSettings;
