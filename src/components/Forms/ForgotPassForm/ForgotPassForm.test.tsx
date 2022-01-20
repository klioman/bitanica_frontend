import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from 'redux/store';
import { testEmail } from 'services/constants/testLoginCredentials';
import ForgotPassForm from './index';

// ================================================:
describe('Forgot password form component:', () => {
	it('Forgot password form component must be render', () => {
		const handleSubmitEmail = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ForgotPassForm emailSubmit={handleSubmitEmail} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it('Should show validation on blur', async () => {
		const handleSubmitEmail = jest.fn();

		const { container, getByPlaceholderText } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ForgotPassForm emailSubmit={handleSubmitEmail} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputEmail = getByPlaceholderText(/forgot_password_field_email/i);
		fireEvent.blur(inputEmail);

		const buttonSubmit = screen.getByRole('button', { name: /form-submit/i });
		expect(buttonSubmit).toBeDisabled();

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(1);
		});
	});

	it('Forgot password form must submitting', async () => {
		const handleSubmitEmail = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ForgotPassForm emailSubmit={handleSubmitEmail} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		userEvent.type(screen.getByPlaceholderText(/forgot_password_field_email/i), testEmail);
		userEvent.click(screen.getByRole('button', { name: /form-submit/i }));

		await waitFor(() => {
			expect(handleSubmitEmail).toHaveBeenCalledTimes(1);
		});
	});
});
