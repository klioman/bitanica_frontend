import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import ConfirmDeletePopup from './index';

// ================================================:
describe('Confirm delete popup component:', () => {
	it('Confirm delete popup component must be render', () => {
		const testCloseModal = jest.fn();
		const testHandleDelete = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ConfirmDeletePopup
						title="Title delete"
						bodyMessage="Body message"
						openModal
						closeModal={testCloseModal}
						handleDelete={testHandleDelete}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
