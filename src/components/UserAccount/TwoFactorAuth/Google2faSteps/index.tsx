import { FC } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import { enable2faRequest } from 'redux/reducers/settings/reducer';
import { IGoogle2faFormData } from 'components/Forms/Google2faForm/types';
import Google2faForm from 'components/Forms/Google2faForm';
import AppSatoreImg from 'assets/img/content/app-store.png';
import GooglePlay from 'assets/img/content/google-play.png';
import { IGoogle2faSteps } from './types';

// ==========================================:
const Google2faSteps: FC<IGoogle2faSteps> = ({ data }) => {
	const dispatch = useDispatch();

	const handleGoogle2faSubmit = (value: IGoogle2faFormData) => {
		dispatch(enable2faRequest(value));
	};

	return (
		<div className="content-block content-block--medium">
			<div className="steps">
				<div className="steps-item">
					<div className="steps-item__header">
						<div className="steps-item__num">
							<span>1</span>
						</div>
						<span className="steps-item__title">
							{String(L.translate('Account.TwoFactorAuth.two_factor_step01_title'))}
						</span>
					</div>
					<div className="steps-item__main">
						<p className="content-block__desc">
							{String(L.translate('Account.TwoFactorAuth.two_factor_step01_text'))}
						</p>
						<div className="download-links steps-item__footer">
							<a
								className="download-link"
								target="_blank"
								rel="noreferrer"
								href="https://apps.apple.com/ru/app/google-authenticator/id388497605"
							>
								<img src={AppSatoreImg} alt="" width="136" height="40" />
							</a>
							<a
								className="download-link"
								target="_blank"
								rel="noreferrer"
								href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
							>
								<img src={GooglePlay} alt="" width="136" height="40" />
							</a>
						</div>
					</div>
				</div>
				<div className="steps-item">
					<div className="steps-item__header">
						<div className="steps-item__num">
							<span>2</span>
						</div>
						<span className="steps-item__title">
							{String(L.translate('Account.TwoFactorAuth.two_factor_step02_title'))}
						</span>
					</div>
					<div className="steps-item__main">
						<p className="content-block__desc">
							{String(L.translate('Account.TwoFactorAuth.two_factor_step02_text'))}
						</p>
						<div className="qr-code steps-item__footer">
							<div className="qr-code__img">
								<img src={data?.QR_Image} alt="qr img" width="150" height="150" />
							</div>
							<div className="qr-code__main">
								<div className="input">
									<p className="input__name input__name--dark">
										{String(L.translate('Account.TwoFactorAuth.two_factor_step02_input_label'))}
									</p>
									<div className="input-wrapper">
										<input
											className="input-item input-item--small-height input-item--green"
											type="text"
											value={data?.secret}
											disabled
										/>
									</div>
								</div>
								<div className="input-notify input-notify--second-type">
									<span className="input-notify__char icon-info-circle" />
									<span className="input-notify__text">
										{String(L.translate('Account.TwoFactorAuth.two_factor_step02_message'))}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="steps-item">
					<div className="steps-item__header">
						<div className="steps-item__num">
							<span>3</span>
						</div>
						<span className="steps-item__title">
							{String(L.translate('Account.TwoFactorAuth.two_factor_step03_title'))}
						</span>
					</div>
					<div className="steps-item__main">
						<Google2faForm
							google2faSubmit={handleGoogle2faSubmit}
							btnText={String(L.translate('Forms.Google2fa.google_2fa_form_btn_enable'))}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Google2faSteps;
