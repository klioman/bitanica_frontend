import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Input from 'ui/Formik/Input';
import DateOfBirthDropdown from 'ui/DateOfBirthDropdown';
import MonthOfBirthDropdown from 'ui/MonthOfBirthDropdown';
import YearOfBirthDropdown from 'ui/YearOfBirthDropdown';
import { IOndatoKycStartForm, IOndatoKycStartFormValue } from './types';

// ==========================================:
const OndatoKycStartForm: FC<IOndatoKycStartForm> = ({ startOndatoKycSubmit }) => {
	const initialValues = {
		firstName: '',
		lastName: '',
		dateOfBirth: 0,
		monthOfBirth: 0,
		yearOfBirth: 0,
	};

	const validationSchema = yup.object().shape({
		firstName: yup
			.string()
			.required('Please, enter your first name!')
			.min(3, 'Min characters must be more than 3!')
			.max(30, 'Max characters must be not more than 30!')
			.matches(
				/^[A-Za-z]+$/,
				'First name must be includes uppercase letters or lowercase letters!',
			),
		lastName: yup
			.string()
			.required('Please, enter your last name!')
			.min(3, 'Min characters must be more than 3!')
			.max(30, 'Max characters must be not more than 30!')
			.matches(/^[A-Za-z]+$/, 'Last name must be includes uppercase letters or lowercase letters!'),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values: IOndatoKycStartFormValue, { resetForm, setSubmitting }) => {
				startOndatoKycSubmit({
					first_name: values.firstName,
					last_name: values.lastName,
					date_birth: `${values.yearOfBirth}-${String(values.monthOfBirth).padStart(
						2,
						'0',
					)}-${String(values.dateOfBirth).padStart(2, '0')}`,
				});

				setSubmitting(false);
				resetForm();
			}}
			validateOnBlur
			enableReinitialize
		>
			{({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
				<Form className="transfer-form">
					<div className="input ">
						<Field
							type="text"
							placeholder="First Name"
							name="firstName"
							required
							component={Input}
						/>
					</div>
					<div className="input ">
						<Field type="text" placeholder="Last Name" name="lastName" required component={Input} />
					</div>

					<div className="select-items">
						<div className="transfer-form__select select-block">
							<DateOfBirthDropdown
								value={values.dateOfBirth}
								onChange={(value: number) => {
									setFieldValue('dateOfBirth', value);
								}}
							/>
						</div>
						<div className="transfer-form__select select-block">
							<MonthOfBirthDropdown
								value={values.monthOfBirth}
								onChange={(value: number) => {
									setFieldValue('monthOfBirth', value);
								}}
							/>
						</div>
						<div className="transfer-form__select select-block">
							<YearOfBirthDropdown
								value={values.yearOfBirth}
								onChange={(value: number) => {
									setFieldValue('yearOfBirth', value);
								}}
							/>
						</div>
					</div>
					<button
						disabled={
							!(isValid && dirty) ||
							isSubmitting ||
							!values.dateOfBirth ||
							!values.monthOfBirth ||
							!values.yearOfBirth
						}
						aria-label="form-submit"
						type="submit"
						className={`button button--full-width ${
							!(isValid && dirty) ||
							isSubmitting ||
							!values.dateOfBirth ||
							!values.monthOfBirth ||
							!values.yearOfBirth
								? 'button--not-verificate'
								: ''
						} `}
					>
						Start verification
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default OndatoKycStartForm;
