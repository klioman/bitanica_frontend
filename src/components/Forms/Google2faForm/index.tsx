import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import L from 'i18n-react';
import { resetGoogle2fa } from 'redux/reducers/settings/reducer';
import Input from 'ui/Formik/Input';
import { IGoogle2faForm, IGoogle2faFormData } from './types';

// ==========================================:
const Google2faForm: FC<IGoogle2faForm> = ({ google2faSubmit, btnText }) => {
	const dispatch = useDispatch();

	const initialValues = {
		totp: '',
	};

	const validationSchema = yup.object().shape({
		totp: yup.string().required(String(L.translate('Errors.google2fa'))),
	});

	const handleCancel = () => {
		dispatch(resetGoogle2fa());
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: IGoogle2faFormData, { resetForm, setSubmitting }) => {
				google2faSubmit(values);
				setSubmitting(false);
				resetForm();
			}}
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty }) => {
				return (
					<Form>
						<div className="input steps__code">
							<p className="input__name input__name--dark">
								{String(L.translate('Forms.Google2fa.google_2fa_form_title'))}
							</p>
							<div className="input-wrapper">
								<Field
									type="text"
									name="totp"
									placeholder={String(L.translate('Forms.Google2fa.google_2fa_form_field_text'))}
									component={Input}
									autoFocus
								/>
							</div>
						</div>
						<div className="steps__code-btn">
							<button
								type="submit"
								className="steps__code-btn-submit"
								aria-label="form-submit"
								disabled={!(isValid && dirty) || isSubmitting}
							>
								{btnText}
							</button>
							<button onClick={handleCancel} className="steps__code-btn-cancel" type="button">
								{String(L.translate('Forms.Google2fa.google_2fa_form_btn_cancel'))}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default Google2faForm;
