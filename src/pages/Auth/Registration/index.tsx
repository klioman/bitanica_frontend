import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { registrationRequest } from 'redux/reducers/auth/reducer';
import { getRegistrIsLoad } from 'redux/reducers/auth/selectors';
import Auth from 'layouts/Auth';
import RegistrForm from 'components/Forms/RegistrForm';
import GoogleCaptcha from 'components/GoogleCaptcha';
import { IRegistrValues } from 'components/Forms/RegistrForm/types';
import Loader from 'ui/Loader';

// ==========================================:
const Registration: FC = () => {
	const [open, setOpen] = useState(false);
	const [registData, setRegistrData] = useState<null | IRegistrValues>(null);

	const registrIsLoad = useSelector(getRegistrIsLoad);

	const dispatch = useDispatch();

	const handleRegistrSubmit = (values: IRegistrValues): void => {
		setRegistrData(values);
		setOpen(true);
	};

	const hangleCaptchaClose = (): void => {
		setRegistrData(null);
		setOpen(false);
	};

	const handleCaptcha = (value: string): void => {
		if (registData && value) {
			dispatch(
				registrationRequest({
					...registData,
					captcha: value,
				}),
			);
		}

		setRegistrData(null);
		setOpen(false);
	};

	return (
		<Auth title={String(L.translate('RegistrPage.registr_page_title'))}>
			<div className="authorization">
				<RegistrForm registrSubmit={handleRegistrSubmit} />
				{registrIsLoad && (
					<div className="auth-loader-wrapper">
						<Loader />
					</div>
				)}
			</div>
			{open && (
				<div className="popup-window popup-window--captcha">
					<div className="popup-window__inside">
						<GoogleCaptcha setCaptcha={handleCaptcha} captchaClose={hangleCaptchaClose} />
						<div className="popup-window__close" onClick={hangleCaptchaClose} />
					</div>
				</div>
			)}
		</Auth>
	);
};

export default Registration;
