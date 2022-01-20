import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import BuySellCrypto from './index';

// ================================================:
describe('Buy sell crypto component:', () => {
	it('Buy sell crypto component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<BuySellCrypto />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
