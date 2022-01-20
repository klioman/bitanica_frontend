import { FC, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import L from 'i18n-react';
import Input from 'ui/Formik/Input';
import { IChangePassForm, IChangePassFormValue } from './types';

// ==========================================:
const ChangePassForm: FC<IChangePassForm> = ({ changePassFormSubmit }) => {
	const [isShowOldPass, setIsShowOldPass] = useState(false);
	const [isShowPass, setIsShowPass] = useState(false);
	const [isShowPassConfirm, setIsShowPassConfirm] = useState(false);

	const initialValues = {
		old_password: '',
		password: '',
		confirm_password: '',
	};

	const validationSchema = yup.object().shape({
		old_password: yup
			.string()
			.required(String(L.translate('Errors.password_required')))
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$/,
				String(L.translate('Errors.password_validation')),
			)
			.max(25, String(L.translate('Errors.password_max_length'))),
		password: yup
			.string()
			.required(String(L.translate('Errors.password_required')))
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$/,
				String(L.translate('Errors.password_validation')),
			)
			.max(25, String(L.translate('Errors.password_max_length'))),
		confirm_password: yup
			.string()
			.required(String(L.translate('Errors.confirm_password_required')))
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$/,
				String(L.translate('Errors.password_validation')),
			)
			.oneOf([yup.ref('password'), null], String(L.translate('Errors.passwords_match')))
			.max(25, String(L.translate('Errors.password_max_length'))),
	});

	const handleOldPassDisplay = (): void => {
		setIsShowOldPass(!isShowOldPass);
	};

	const handlePassDisplay = (): void => {
		setIsShowPass(!isShowPass);
	};

	const handlePassConfirmDisplay = (): void => {
		setIsShowPassConfirm(!isShowPassConfirm);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: IChangePassFormValue, { setSubmitting, resetForm }) => {
				changePassFormSubmit(values);
				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty }) => {
				return (
					<Form>
						<div className="change-form">
							<Field
								type={isShowOldPass ? 'text' : 'password'}
								placeholder={String(
									L.translate('Forms.ChangePassForm.change_pass_form_field_old_password'),
								)}
								name="old_password"
								required
								component={Input}
								ariaLabel="show-old-password"
								showPass={setIsShowOldPass}
								setIsShowPass={handleOldPassDisplay}
							/>
							<Field
								type={isShowPass ? 'text' : 'password'}
								placeholder={String(
									L.translate('Forms.ChangePassForm.change_pass_form_field_password'),
								)}
								name="password"
								required
								component={Input}
								ariaLabel="show-new-password"
								showPass={setIsShowPass}
								setIsShowPass={handlePassDisplay}
							/>
							<Field
								type={isShowPassConfirm ? 'text' : 'password'}
								placeholder={String(
									L.translate('Forms.ChangePassForm.change_pass_form_field_confirm_password'),
								)}
								name="confirm_password"
								required
								component={Input}
								ariaLabel="show-confirm-password"
								showPass={setIsShowPassConfirm}
								setIsShowPass={handlePassConfirmDisplay}
							/>
						</div>
						<div className="form-submit">
							<button
								type="submit"
								disabled={!(isValid && dirty) || isSubmitting}
								className="button button--full-width"
								aria-label="form-submit"
							>
								{String(L.translate('Forms.ChangePassForm.change_pass_form_btn'))}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default ChangePassForm;
