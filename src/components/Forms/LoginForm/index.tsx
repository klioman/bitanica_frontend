import { FC, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import L from 'i18n-react';
import Input from 'ui/Formik/Input';
import arrowUp from 'assets/img/icons/arrow_up.svg';
import { ILoginForm, ILoginSubmitValue } from './types';

// ==========================================:
const LoginForm: FC<ILoginForm> = ({ loginSubmit }) => {
	const [showTotp, setShowTotp] = useState(false);
	const [isShowPass, setIsShowPass] = useState(false);

	const initialValues = {
		email: '',
		password: '',
		totp: '',
	};

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.required(String(L.translate('Errors.required_email')))
			.email(String(L.translate('Errors.email_format')))
			.max(60, String(L.translate('Errors.email_max_characters'))),
		password: yup
			.string()
			.required(String(L.translate('Errors.password_required')))
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$/,
				String(L.translate('Errors.password_validation')),
			)
			.max(25, String(L.translate('Errors.password_max_length'))),
	});

	const handlePassDisplay = (): void => {
		setIsShowPass(!isShowPass);
	};

	const handleShowTotp = (): void => {
		setShowTotp(!showTotp);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: ILoginSubmitValue, { resetForm, setSubmitting }) => {
				loginSubmit(values);
				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty }) => (
				<Form>
					<p className="authorization__title">
						{String(L.translate('Forms.LoginForm.login_form_title'))}
					</p>
					<div className="authorization__details">
						<p>{String(L.translate('Forms.LoginForm.login_form_subtitle'))}</p>
					</div>
					<div className="authorization__form">
						<div className="authorization__field">
							<Field
								type="email"
								placeholder={String(L.translate('Forms.LoginForm.login_field_email'))}
								name="email"
								required
								component={Input}
							/>
						</div>
						<div className="authorization__field">
							<Field
								type={isShowPass ? 'text' : 'password'}
								placeholder={String(L.translate('Forms.LoginForm.login_field_password'))}
								name="password"
								required
								component={Input}
								ariaLabel="show-password"
								showPass={isShowPass}
								setIsShowPass={handlePassDisplay}
							/>
						</div>

						<button type="button" className="google-2fa-button" onClick={handleShowTotp}>
							<span>{String(L.translate('Forms.LoginForm.login_google2fa'))}</span>
							<span className={`google-2fa-icon ${showTotp ? 'google-2fa-icon--rotate' : ''}`}>
								<img src={arrowUp} alt="" />
							</span>
						</button>

						{showTotp && (
							<div className="authorization__field google-2fa-input">
								<Field
									type="text"
									placeholder={String(L.translate('Forms.LoginForm.login_google2fa'))}
									name="totp"
									required
									component={Input}
								/>
							</div>
						)}
						<div className="authorization__options">
							<Link to="/forgot-password" className="authorization__forgot-link">
								{String(L.translate('Forms.LoginForm.login_forgot_password'))}
							</Link>
						</div>
					</div>
					<div className="form-submit">
						<button
							disabled={!(isValid && dirty) || isSubmitting}
							aria-label="form-submit"
							type="submit"
							className="button button--full-width"
						>
							{String(L.translate('Forms.LoginForm.login_submit_btn'))}
						</button>
						<button type="button" className="button button--type2 button--full-width">
							{String(L.translate('Forms.LoginForm.login_support'))}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
