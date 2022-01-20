import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from 'redux/store';

import {
	testConfirmPassword,
	testEmail,
	testPassword,
} from 'services/constants/testLoginCredentials';
import RegistrForm from './index';

// ================================================:
describe('Registration form component:', () => {
	it('Registration form component must be render', () => {
		const handleRegistrSubmit = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<RegistrForm registrSubmit={handleRegistrSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it('Display password after click on button', () => {
		const handleRegistrSubmit = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<RegistrForm registrSubmit={handleRegistrSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = screen.getByPlaceholderText(/registr_form_field_password/i);
		const inputType = inputPassword.getAttribute('type');
		expect(inputType).toBe('password');

		const button = screen.getByRole('button', { name: 'show-password' });
		fireEvent.click(button);

		const inputTypeAfterClick = inputPassword.getAttribute('type');
		expect(inputTypeAfterClick).toBe('text');

		const inputConfirmPassword = screen.getByPlaceholderText(
			/registr_form_field_confirm_password/i,
		);
		const inputConfirmType = inputConfirmPassword.getAttribute('type');
		expect(inputConfirmType).toBe('password');

		const buttonConfirm = screen.getByRole('button', { name: 'show-confirm-password' });
		fireEvent.click(buttonConfirm);

		const inputConfirmTypeAfterClick = inputConfirmPassword.getAttribute('type');
		expect(inputConfirmTypeAfterClick).toBe('text');
	});

	it('Should show validation on blur', async () => {
		const handleRegistrSubmit = jest.fn();

		const { container, getByPlaceholderText } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<RegistrForm registrSubmit={handleRegistrSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		// =======================================:
		const inputEmail = getByPlaceholderText(/registr_form_field_email/i);
		fireEvent.blur(inputEmail);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(1);
		});

		// =======================================:
		const inputPassword = getByPlaceholderText(/registr_form_field_password/i);
		fireEvent.blur(inputPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(2);
		});

		// =======================================:
		const inputConfirmPassword = getByPlaceholderText(/registr_form_field_confirm_password/i);
		fireEvent.blur(inputConfirmPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(3);
		});

		// =======================================:
		const buttonSubmit = screen.getByRole('button', { name: /form-submit/i });
		expect(buttonSubmit).toBeDisabled();
	});

	it('Registration form component must submitting', async () => {
		const handleRegistrSubmit = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<RegistrForm registrSubmit={handleRegistrSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const acceptTermsCheckbox = screen.getByRole('checkbox', { name: 'accept-terms' });
		const cookiePolicyCheckbox = screen.getByRole('checkbox', { name: 'cookie-policy' });

		userEvent.type(screen.getByPlaceholderText(/registr_form_field_email/i), testEmail);
		userEvent.type(screen.getByPlaceholderText(/registr_form_field_password/i), testPassword);
		userEvent.type(
			screen.getByPlaceholderText(/registr_form_field_confirm_password/i),
			testConfirmPassword,
		);
		userEvent.click(acceptTermsCheckbox);
		userEvent.click(cookiePolicyCheckbox);

		const submitButton = screen.getByRole('button', { name: 'form-submit' });
		submitButton.removeAttribute('disabled');

		userEvent.click(screen.getByRole('button', { name: /form-submit/i }));

		await waitFor(() =>
			expect(handleRegistrSubmit).toHaveBeenCalledWith({
				email: testEmail,
				password: testPassword,
				confirmPassword: testConfirmPassword,
				acceptTerms: true,
				cookiePolicy: true,
			}),
		);
	});
});
