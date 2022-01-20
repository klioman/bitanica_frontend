import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { getForgotPassIsLoad } from 'redux/reducers/auth/selectors';
import { forgotPasswordRequest } from 'redux/reducers/auth/reducer';
import Auth from 'layouts/Auth';
import ForgotPassForm from 'components/Forms/ForgotPassForm';
import { IForgotPassSubmitValue } from 'components/Forms/ForgotPassForm/types';
import Loader from 'ui/Loader';

// ==========================================:
const ForgotPassword: FC = () => {
	const forgotPassIsLoad = useSelector(getForgotPassIsLoad);
	const dispatch = useDispatch();

	const handleSubmitEmail = (values: IForgotPassSubmitValue) => {
		dispatch(forgotPasswordRequest(values));
	};

	return (
		<Auth title={String(L.translate('ForgotPasswordPage.forgot_password_page_title'))}>
			<div className="authorization">
				<ForgotPassForm emailSubmit={handleSubmitEmail} />
				{forgotPassIsLoad && (
					<div className="auth-loader-wrapper">
						<Loader />
					</div>
				)}
			</div>
		</Auth>
	);
};

export default ForgotPassword;
