import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from 'redux/store';
import Google2faForm from './index';

// ================================================:
describe('Forgot password form component:', () => {
	it('Forgot password form component must be render', () => {
		const handleGoogle2faSubmit = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<Google2faForm google2faSubmit={handleGoogle2faSubmit} btnText="Test" />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it('Should show validation on blur', async () => {
		const handleGoogle2faSubmit = jest.fn();

		const { container, getByPlaceholderText } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<Google2faForm google2faSubmit={handleGoogle2faSubmit} btnText="Test" />
				</BrowserRouter>
			</ReduxProvider>,
		);

		const inputPassword = getByPlaceholderText(/google_2fa_form_field_text/i);
		fireEvent.blur(inputPassword);

		await waitFor(() => {
			expect(container.getElementsByClassName('input-notify').length).toBe(1);
		});
	});

	it('Create new password form must submitting', async () => {
		const handleGoogle2faSubmit = jest.fn();

		render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<Google2faForm google2faSubmit={handleGoogle2faSubmit} btnText="Test" />
				</BrowserRouter>
			</ReduxProvider>,
		);

		userEvent.type(screen.getByPlaceholderText(/google_2fa_form_field_text/i), '234678');
		userEvent.click(screen.getByRole('button', { name: /form-submit/i }));

		await waitFor(() => {
			expect(handleGoogle2faSubmit).toHaveBeenCalledTimes(1);
		});
	});
});
