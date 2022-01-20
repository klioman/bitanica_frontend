import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from 'redux/store';
import { testPassword } from 'services/constants/testLoginCredentials';
import ChangePassForm from './index';

// ================================================:
describe('Change new form component:', () => {
	it('Change new password form component must be render', () => {
		const handleChangePassForm = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ChangePassForm changePassFormSubmit={handleChangePassForm} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it('Display password after click on button', () => {
		const handleChangePassForm = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ChangePassForm changePassFormSubmit={handleChangePassForm} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputOldPassword = screen.getByPlaceholderText(/change_pass_form_field_old_password/i);
		const inputOldPasswordType = inputOldPassword.getAttribute('type');
		expect(inputOldPasswordType).toBe('password');

		const button = screen.getByRole('button', { name: 'show-old-password' });
		fireEvent.click(button);

		const inputOldTypeAfterClick = inputOldPassword.getAttribute('type');
		expect(inputOldTypeAfterClick).toBe('text');

		// --------------------------------------------:
		const inputNewPassword = screen.getByPlaceholderText(/change_pass_form_field_password/i);
		const inputNewPasswordType = inputNewPassword.getAttribute('type');
		expect(inputNewPasswordType).toBe('password');

		const newPassButton = screen.getByRole('button', { name: 'show-new-password' });
		fireEvent.click(newPassButton);

		const inputNewTypeAfterClick = inputOldPassword.getAttribute('type');
		expect(inputNewTypeAfterClick).toBe('text');

		// --------------------------------------------:
		const inputConfirmPassword = screen.getByPlaceholderText(
			/change_pass_form_field_confirm_password/i,
		);
		const inputConfirmPasswordType = inputConfirmPassword.getAttribute('type');
		expect(inputConfirmPasswordType).toBe('password');

		const confirmPassButton = screen.getByRole('button', { name: 'show-confirm-password' });
		fireEvent.click(confirmPassButton);

		const inputConfirmPassAfterClick = inputOldPassword.getAttribute('type');
		expect(inputConfirmPassAfterClick).toBe('text');
	});

	it('Should show validation on blur', async () => {
		const handleChangePassForm = jest.fn();

		const { container, getByPlaceholderText } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ChangePassForm changePassFormSubmit={handleChangePassForm} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = getByPlaceholderText(/change_pass_form_field_old_password/i);
		fireEvent.blur(inputPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(1);
		});

		// --------------------------------------------:
		const inputNewPassword = getByPlaceholderText(/change_pass_form_field_password/i);
		fireEvent.blur(inputNewPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(2);
		});

		// =======================================:
		const inputConfirmPassword = getByPlaceholderText(/change_pass_form_field_confirm_password/i);
		fireEvent.blur(inputConfirmPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(3);
		});

		// --------------------------------------------:
		const buttonSubmit = screen.getByRole('button', { name: /form-submit/i });
		expect(buttonSubmit).toBeDisabled();
	});

	it('Create new password form must submitting', async () => {
		const handleChangePassForm = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ChangePassForm changePassFormSubmit={handleChangePassForm} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		userEvent.type(
			screen.getByPlaceholderText(/change_pass_form_field_old_password/i),
			testPassword,
		);
		userEvent.type(screen.getByPlaceholderText(/change_pass_form_field_password/i), testPassword);
		userEvent.type(
			screen.getByPlaceholderText(/change_pass_form_field_confirm_password/i),
			testPassword,
		);

		userEvent.click(screen.getByRole('button', { name: /form-submit/i }));

		await waitFor(() => {
			expect(handleChangePassForm).toHaveBeenCalledTimes(1);
		});
	});
});
