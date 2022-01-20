import * as yup from 'yup';

// ==========================================:
export const email = yup
	.string()
	.required('Please, enter your email!')
	.email('Invalid email format!')
	.max(60, 'Max characters must be not more than 60!');

// ==========================================:
export const password = yup
	.string()
	.required('Please, enter your password!')
	.matches(
		/^(?=.*[A-Za-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/,
		'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, 1 special symbol',
	)
	.max(25, 'Max characters must be not more than 25!');

// ==========================================:
export const confirmPassword = yup
	.string()
	.required('Please, enter your confirm password!')
	.matches(
		/^(?=.*[A-Za-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/,
		'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, 1 special symbol',
	)
	.oneOf([yup.ref('password'), null], 'Passwords must match!')
	.max(25, 'Max characters must be not more than 25!');
// ==========================================:
export const acceptTerms = yup
	.bool()
	.oneOf([true], 'You must agree to the terms & conditions and privacy policy!');

// ==========================================:
export const temporaryCode = yup.string().required('Please, enter your temporary code!');

// ==========================================:
export const cookiePolicy = yup.bool().oneOf([true], 'You must agree to  cookie policy!');

// ==========================================:
export const recaptcha = yup.string().required('Please verify that you are a human!');

// ==========================================:
export const google2fa = yup.string().required('This field is required!');
