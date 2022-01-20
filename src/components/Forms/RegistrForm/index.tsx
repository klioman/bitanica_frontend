import { useState, FC, KeyboardEvent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import L from 'i18n-react';
import Input from 'ui/Formik/Input';
import TextError from 'ui/Formik/TextError';
import yup from 'services/utils/capsLockValidate';
import { IRegistrValues, IRegistrForm } from './types';

// ==========================================:
const RegistrForm: FC<IRegistrForm> = ({ registrSubmit }) => {
	const [isShowPass, setIsShowPass] = useState(false);
	const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
	const [isCapsLockOn, setIsCapsLockOn] = useState(false);

	const initialValues = {
		email: '',
		password: '',
		confirmPassword: '',
		acceptTerms: false,
		cookiePolicy: false,
	};

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.capsLockValidate(isCapsLockOn, 'CapsLock is on')
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
		confirmPassword: yup
			.string()
			.required(String(L.translate('Errors.confirm_password_required')))
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$/,
				String(L.translate('Errors.password_validation')),
			)
			.oneOf([yup.ref('password'), null], String(L.translate('Errors.passwords_match')))
			.max(25, String(L.translate('Errors.password_max_length'))),
		acceptTerms: yup.bool().oneOf([true], String(L.translate('Errors.accept_terms'))),
		cookiePolicy: yup.bool().oneOf([true], String(L.translate('Errors.cookie_policy'))),
	});

	const handlePassDisplay = (): void => {
		setIsShowPass(!isShowPass);
	};

	const handleConfirmPassDisplay = (): void => {
		setIsShowConfirmPass(!isShowConfirmPass);
	};

	const handleCapsLockOn = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.getModifierState('CapsLock')) {
			setIsCapsLockOn(true);
		} else {
			setIsCapsLockOn(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: IRegistrValues, { resetForm, setSubmitting }) => {
				registrSubmit(values);
				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ errors, touched, isSubmitting, isValid, dirty }) => {
				return (
					<Form>
						<p className="authorization__title">
							{String(L.translate('Forms.RegistrForm.registr_form_title'))}
						</p>
						<div className="authorization__details">
							<p>{String(L.translate('Forms.RegistrForm.registr_form_subtitle'))}</p>
						</div>
						<div className="authorization__form">
							<div className="authorization__field">
								<Field
									type="email"
									placeholder={String(L.translate('Forms.RegistrForm.registr_form_field_email'))}
									name="email"
									required
									onKeyUp={handleCapsLockOn}
									component={Input}
								/>
							</div>
							<div className="authorization__field">
								<Field
									type={isShowPass ? 'text' : 'password'}
									placeholder={String(L.translate('Forms.RegistrForm.registr_form_field_password'))}
									name="password"
									required
									component={Input}
									ariaLabel="show-password"
									showPass={isShowPass}
									setIsShowPass={handlePassDisplay}
								/>
							</div>
							<div className="authorization__field">
								<Field
									type={isShowConfirmPass ? 'text' : 'password'}
									placeholder={String(
										L.translate('Forms.RegistrForm.registr_form_field_confirm_password'),
									)}
									name="confirmPassword"
									required
									component={Input}
									ariaLabel="show-confirm-password"
									showPass={isShowPass}
									setIsShowPass={handleConfirmPassDisplay}
								/>
							</div>
							<div className="authorization__options">
								<div className="checkbox">
									<label htmlFor="terms-conditions" className="checkbox__label">
										<Field
											type="checkbox"
											name="acceptTerms"
											aria-label="accept-terms"
											className="hidden"
											id="terms-conditions"
										/>
										<span className="checkbox__item">
											<span className="checkbox__item-icon">
												<span className="icon-Checkbox" />{' '}
											</span>
										</span>

										<div
											className={`checkbox ${
												errors?.acceptTerms && touched?.acceptTerms ? ' input--error' : ''
											}`}
										/>

										<span className="checkbox__text">
											{String(L.translate('Forms.RegistrForm.registr_form_agree_terms'))}{' '}
											<a href="/">
												{String(
													L.translate('Forms.RegistrForm.registr_form_agree_terms_conditions'),
												)}
											</a>{' '}
											{String(L.translate('Forms.RegistrForm.registr_form_agree_terms_and'))}{' '}
											<a href="/">
												{String(L.translate('Forms.RegistrForm.registr_form_agree_terms_privat'))}
											</a>
										</span>
									</label>
									<ErrorMessage name="acceptTerms" component={TextError} />
								</div>
								<div className="authorization__options-full">
									<div className="checkbox checkbox--no-mb">
										<label htmlFor="cookie-policy" className="checkbox__label">
											<Field
												type="checkbox"
												name="cookiePolicy"
												aria-label="cookie-policy"
												className="hidden"
												id="cookie-policy"
											/>
											<div
												className={`checkbox ${
													errors?.cookiePolicy && touched?.cookiePolicy ? ' input--error' : ''
												}`}
											/>
											<span className="checkbox__item">
												<span className="checkbox__item-icon">
													<span className="icon-Checkbox" />
												</span>
											</span>
											<span className="checkbox__text">
												{String(L.translate('Forms.RegistrForm.registr_form_agree_width'))}{' '}
												<a href="/">
													{String(L.translate('Forms.RegistrForm.registr_form_agree_width_cookie'))}
												</a>
											</span>
										</label>
										<ErrorMessage name="cookiePolicy" component={TextError} />
									</div>
								</div>
							</div>
						</div>
						<div className="form-submit">
							<button
								className="button button--full-width"
								disabled={!(isValid && dirty) || isSubmitting}
								aria-label="form-submit"
								type="submit"
							>
								{String(L.translate('Forms.RegistrForm.registr_form_submit_btn'))}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default RegistrForm;
