import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import IPConfirmForm from './index';

// ================================================:
describe('IP confirm form:', () => {
	it('Forgot password form must be render', () => {
		const handleIpConfirmSubmit = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<IPConfirmForm ipConfirmSubmit={handleIpConfirmSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
