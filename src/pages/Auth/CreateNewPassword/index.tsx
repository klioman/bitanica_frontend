import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreateNewPassIsLoad } from 'redux/reducers/auth/selectors';
import { createNewPasswordRequest } from 'redux/reducers/auth/reducer';
import Auth from 'layouts/Auth';
import CreateNewPassForm from 'components/Forms/CreateNewPassForm';
import { ICreateNewPasswordFormData } from 'components/Forms/CreateNewPassForm/types';
import Loader from 'ui/Loader';

// ==========================================:
const CreateNewPassword: FC = () => {
	const createNewPassLoad = useSelector(getCreateNewPassIsLoad);
	const dispatch = useDispatch();

	const handleCreateNewPass = (values: ICreateNewPasswordFormData) => {
		dispatch(createNewPasswordRequest(values));
	};

	return (
		<Auth title="Create new password">
			<div className="authorization">
				<CreateNewPassForm createNewPassSubmit={handleCreateNewPass} />
				{createNewPassLoad && (
					<div className="auth-loader-wrapper">
						<Loader />
					</div>
				)}
			</div>
		</Auth>
	);
};

export default CreateNewPassword;
