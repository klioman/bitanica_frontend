import { FC, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import * as yup from 'yup';
import L from 'i18n-react';
import Input from 'ui/Formik/Input';
import { ICreateNewPassSubmitValue, ICreateNewPasswordForm } from './types';

// ==========================================:
const CreateNewPassForm: FC<ICreateNewPasswordForm> = ({ createNewPassSubmit }) => {
	const [isShowPass, setIsShowPass] = useState(false);
	const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
	const history = useHistory();
	const location = useLocation();

	const queryPar = queryString.parse(location.search);
	const tempToken = Object.keys(queryPar);

	const initialValues = {
		password: '',
		confirmPassword: '',
	};

	const validationSchema = yup.object().shape({
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
	});

	const handlePassDisplay = (): void => {
		setIsShowPass(!isShowPass);
	};

	const handleConfirmPassDisplay = (): void => {
		setIsShowConfirmPass(!isShowConfirmPass);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: ICreateNewPassSubmitValue, { resetForm, setSubmitting }) => {
				const dataValues = {
					data: {
						password: values.password,
						token: tempToken[0],
					},
					history,
				};
				createNewPassSubmit(dataValues);
				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty }) => {
				return (
					<Form>
						<p className="authorization__title">Create New Password</p>
						<div className="authorization__details">
							<p>Please enter your email address in order to get the reset password code</p>
						</div>
						<div className="authorization__form">
							<div className="authorization__field">
								<Field
									type={isShowPass ? 'text' : 'password'}
									placeholder="Password"
									name="password"
									required
									title="Password"
									component={Input}
									ariaLabel="show-password"
									showPass={isShowPass}
									setIsShowPass={handlePassDisplay}
								/>
							</div>
							<div className="authorization__field">
								<Field
									type={isShowConfirmPass ? 'text' : 'password'}
									placeholder="Confirm password"
									name="confirmPassword"
									required
									title="Confirm password"
									component={Input}
									ariaLabel="show-confirm-password"
									showPass={isShowConfirmPass}
									setIsShowPass={handleConfirmPassDisplay}
								/>
							</div>
						</div>
						<div className="form-submit">
							<button
								disabled={!(isValid && dirty) || isSubmitting}
								aria-label="form-submit"
								type="submit"
								className="button button--full-width"
							>
								Confirm
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default CreateNewPassForm;
