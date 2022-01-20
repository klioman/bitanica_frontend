import * as yup from 'yup';
import {
	password,
	email,
	confirmPassword,
	acceptTerms,
	cookiePolicy,
	temporaryCode,
	google2fa,
} from 'services/utils/formValidation';

// ==========================================:
export const loginValidationSchema = yup.object().shape({
	email,
	password,
});

// ==========================================:
export const createNewPassFormSchema = yup.object().shape({
	password,
	confirmPassword,
});

// ==========================================:
export const registrValidationSchema = yup.object().shape({
	email,
	password,
	confirmPassword,
	acceptTerms,
	cookiePolicy,
});

// ==========================================:
export const forgotPassSchema = yup.object().shape({
	email,
});

// ==========================================:
export const confirmEmailSchema = yup.object().shape({
	code: temporaryCode,
});

// ==========================================:
export const changePassSchema = yup.object().shape({
	old_password: password,
	password,
	confirm_password: confirmPassword,
});

// ==========================================:
export const google2faSchema = yup.object().shape({
	totp: google2fa,
});
