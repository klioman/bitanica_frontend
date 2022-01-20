import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import ToastifyComponent from './index';

// ================================================:
describe('Toastify custom component:', () => {
	it('Toastify custom component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ToastifyComponent message="Test" />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
