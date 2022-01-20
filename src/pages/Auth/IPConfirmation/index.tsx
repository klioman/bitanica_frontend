import { FC } from 'react';
import L from 'i18n-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getIpConfirmIsLoad } from 'redux/reducers/auth/selectors';
import { ipConfirmRequest } from 'redux/reducers/auth/reducer';
import Auth from 'layouts/Auth';
import IPConfirmForm from 'components/Forms/IPConfirmForm';
import { IIpConfirmSubmitValue } from 'components/Forms/IPConfirmForm/types';
import Loader from 'ui/Loader';

// ==========================================:
const IPConfirmation: FC = () => {
	const ipConfirmIsLoad = useSelector(getIpConfirmIsLoad);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleIpConfirmSubmit = (values: IIpConfirmSubmitValue) => {
		dispatch(ipConfirmRequest({ data: values, history }));
	};

	return (
		<Auth title={String(L.translate('IPConfirmation.ip_confirmation_title'))}>
			<div className="authorization">
				<Link to="/login" className="back-btn">
					<span className="back-btn__arrow icon-arrow" />
					<span className="back-btn__text">
						{String(L.translate('Forms.ForgotPassword.forgot_password_link'))}
					</span>
				</Link>
				<p className="authorization__title">
					{String(L.translate('IPConfirmation.ip_confirmation_title'))}
				</p>
				<div className="authorization__details">
					<p>{String(L.translate('IPConfirmation.ip_confirmation_text'))}</p>
				</div>

				<IPConfirmForm ipConfirmSubmit={handleIpConfirmSubmit} />
				{ipConfirmIsLoad && (
					<div className="auth-loader-wrapper">
						<Loader />
					</div>
				)}
			</div>
		</Auth>
	);
};

export default IPConfirmation;
