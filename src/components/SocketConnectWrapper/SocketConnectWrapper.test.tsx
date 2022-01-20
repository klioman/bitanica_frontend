import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import SocketConnectWrapper from './index';

// ================================================:
describe('Socket connect wrapper component:', () => {
	it('Socket connect wrapper component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SocketConnectWrapper>
						<div>Test component</div>
					</SocketConnectWrapper>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
