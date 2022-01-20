import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import L from 'i18n-react';
import Input from 'ui/Formik/Input';
import { IForgotPassSubmitValue, IForgotPasswordForm } from './types';

// ==========================================:
const ForgotPassForm: FC<IForgotPasswordForm> = ({ emailSubmit }) => {
	const initialValues = {
		email: '',
	};

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.required(String(L.translate('Errors.required_email')))
			.email(String(L.translate('Errors.email_format')))
			.max(60, String(L.translate('Errors.email_max_characters'))),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: IForgotPassSubmitValue, { resetForm, setSubmitting }) => {
				emailSubmit(values);
				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty }) => {
				return (
					<Form>
						<Link to="/login" className="back-btn">
							<span className="back-btn__arrow icon-arrow" />
							<span className="back-btn__text">
								{String(L.translate('Forms.ForgotPassword.forgot_password_link'))}
							</span>
						</Link>
						<p className="authorization__title">
							{String(L.translate('Forms.ForgotPassword.forgot_password_title'))}
						</p>
						<div className="authorization__details">
							<p>{String(L.translate('Forms.ForgotPassword.forgot_password_text'))}</p>
						</div>
						<div className="authorization__form">
							<div className="authorization__field">
								<Field
									type="email"
									placeholder={String(
										L.translate('Forms.ForgotPassword.forgot_password_field_email'),
									)}
									name="email"
									required
									component={Input}
								/>
							</div>
						</div>
						<div className="form-submit">
							<button
								type="submit"
								disabled={!(isValid && dirty) || isSubmitting}
								className="button button--full-width"
								aria-label="form-submit"
							>
								{String(L.translate('Forms.ForgotPassword.forgot_password_btn_submit'))}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default ForgotPassForm;
