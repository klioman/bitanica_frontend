import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { useHistory } from 'react-router';
import { loginRequest } from 'redux/reducers/auth/reducer';
import { getLoginIsLoad } from 'redux/reducers/auth/selectors';
import Auth from 'layouts/Auth';
import LoginForm from 'components/Forms/LoginForm';
import GoogleCaptcha from 'components/GoogleCaptcha';
import { ILoginSubmitValue } from 'components/Forms/LoginForm/types';
import Loader from 'ui/Loader';

// ==========================================:
const Login: FC = () => {
	const [open, setOpen] = useState(false);
	const [loginData, setLoginData] = useState<null | ILoginSubmitValue>(null);
	const history = useHistory();

	const loginIsLoad = useSelector(getLoginIsLoad);

	const dispatch = useDispatch();

	const handleLoginSubmit = (values: ILoginSubmitValue): void => {
		setLoginData(values);
		setOpen(true);
	};

	const hangleCaptchaClose = (): void => {
		setLoginData(null);
		setOpen(false);
	};

	const handleCaptcha = (value: string): void => {
		if (loginData && value) {
			dispatch(
				loginRequest({
					data: {
						...loginData,
						captcha: value,
					},
					history,
				}),
			);
		}

		setLoginData(null);
		setOpen(false);
	};

	return (
		<Auth title={String(L.translate('LoginPage.login_page_title'))}>
			<div className="authorization">
				<LoginForm loginSubmit={handleLoginSubmit} />
				{loginIsLoad && (
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

export default Login;
