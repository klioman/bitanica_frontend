import { FC } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import L from 'i18n-react';
import Input from 'ui/Formik/Input';
import { IIpConfirmForm, IIpConfirmSubmitValue } from './types';

// ==========================================:
const IPConfirmForm: FC<IIpConfirmForm> = ({ ipConfirmSubmit }) => {
	const initialValues = {
		email: '',
		code: '',
	};

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.required(String(L.translate('Errors.required_email')))
			.email(String(L.translate('Errors.email_format')))
			.max(60, String(L.translate('Errors.email_max_characters'))),
		code: yup.string().required(String(L.translate('IPConfirmation.ip_confirmation_code'))),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: IIpConfirmSubmitValue, { resetForm, setSubmitting }) => {
				ipConfirmSubmit(values);
				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty }) => {
				return (
					<Form>
						<div className="authorization__form">
							<Field
								type="email"
								placeholder={String(L.translate('IPConfirmation.ip_confirmation_field_email'))}
								name="email"
								required
								component={Input}
							/>
							<Field
								type="text"
								placeholder={String(L.translate('IPConfirmation.ip_confirmation_title'))}
								name="code"
								required
								component={Input}
							/>
						</div>
						<div className="form-submit">
							<button
								type="submit"
								className="button button--full-width"
								disabled={!(isValid && dirty) || isSubmitting}
							>
								{String(L.translate('IPConfirmation.ip_confirmation_submit'))}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default IPConfirmForm;
