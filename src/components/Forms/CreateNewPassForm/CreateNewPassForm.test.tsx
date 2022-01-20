import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from 'redux/store';
import { testPassword } from 'services/constants/testLoginCredentials';
import CreateNewPassForm from './index';

// ================================================:
describe('Create new form component:', () => {
	it('Create new password form component must be render', () => {
		const handleCreateNewPassSubmit = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<CreateNewPassForm createNewPassSubmit={handleCreateNewPassSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it('Display password after click on button', () => {
		const handleCreateNewPass = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<CreateNewPassForm createNewPassSubmit={handleCreateNewPass} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = screen.getByPlaceholderText('Password');
		const inputType = inputPassword.getAttribute('type');
		expect(inputType).toBe('password');

		const button = screen.getByRole('button', { name: 'show-password' });
		userEvent.click(button);

		const inputTypeAfterClick = inputPassword.getAttribute('type');
		expect(inputTypeAfterClick).toBe('text');
	});

	it('Display confirm password after click on button', () => {
		const handleCreateNewPass = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<CreateNewPassForm createNewPassSubmit={handleCreateNewPass} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = screen.getByPlaceholderText('Confirm password');
		const inputType = inputPassword.getAttribute('type');
		expect(inputType).toBe('password');

		const button = screen.getByRole('button', { name: 'show-confirm-password' });
		userEvent.click(button);

		const inputTypeAfterClick = inputPassword.getAttribute('type');
		expect(inputTypeAfterClick).toBe('text');
	});

	it('Should show validation on blur', async () => {
		const handleCreateNewPass = jest.fn();

		const { container, getByPlaceholderText } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<CreateNewPassForm createNewPassSubmit={handleCreateNewPass} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = getByPlaceholderText('Password');
		fireEvent.blur(inputPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(1);
		});

		// =======================================:
		const inputConfirmPassword = getByPlaceholderText('Confirm password');
		fireEvent.blur(inputConfirmPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(2);
		});

		// =======================================:
		const buttonSubmit = screen.getByRole('button', { name: /form-submit/i });
		expect(buttonSubmit).toBeDisabled();
	});

	it('Create new password form must submitting', async () => {
		const handleCreateNewPass = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<CreateNewPassForm createNewPassSubmit={handleCreateNewPass} />
				</BrowserRouter>
			</ReduxProvider>,
		);

		userEvent.type(screen.getByPlaceholderText('Password'), testPassword);
		userEvent.type(screen.getByPlaceholderText('Confirm password'), testPassword);

		userEvent.click(screen.getByRole('button', { name: /form-submit/i }));

		await waitFor(() => {
			expect(handleCreateNewPass).toHaveBeenCalledTimes(1);
		});
	});
});
