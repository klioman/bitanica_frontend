import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from 'redux/store';
import { testEmail, testPassword } from 'services/constants/testLoginCredentials';
import LoginForm from './index';

// ================================================:
describe('Login form component:', () => {
	it('Login form component must be render', () => {
		const handleLoginSubmit = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<LoginForm loginSubmit={handleLoginSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it('Display password after click on button', () => {
		const handleLoginSubmit = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<LoginForm loginSubmit={handleLoginSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = screen.getByPlaceholderText(/Password/i);
		const inputType = inputPassword.getAttribute('type');
		expect(inputType).toBe('password');

		const button = screen.getByRole('button', { name: /show-password/i });
		userEvent.click(button);

		const inputTypeAfterClick = inputPassword.getAttribute('type');
		expect(inputTypeAfterClick).toBe('text');
	});

	it('Should show validation on blur', async () => {
		const handleLoginSubmit = jest.fn();

		const { container, getByPlaceholderText } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<LoginForm loginSubmit={handleLoginSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		// =======================================:
		const inputEmail = getByPlaceholderText(/Email/i);
		fireEvent.blur(inputEmail);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(1);
		});

		// =======================================:
		const inputPassword = getByPlaceholderText(/Password/i);
		fireEvent.blur(inputPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(2);
		});

		// =======================================:
		const buttonSubmit = screen.getByRole('button', { name: /form-submit/i });
		expect(buttonSubmit).toBeDisabled();
	});

	it('Login form component must submitting', async () => {
		const handleLoginSubmit = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<LoginForm loginSubmit={handleLoginSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		userEvent.type(screen.getByPlaceholderText(/email/i), testEmail);
		userEvent.type(screen.getByPlaceholderText(/password/i), testPassword);

		const submitButton = screen.getByRole('button', { name: /form-submit/i });
		submitButton.removeAttribute('disabled');

		userEvent.click(submitButton);

		await waitFor(() =>
			expect(handleLoginSubmit).toHaveBeenCalledWith({
				email: testEmail,
				password: testPassword,
				totp: '',
			}),
		);
	});
});
