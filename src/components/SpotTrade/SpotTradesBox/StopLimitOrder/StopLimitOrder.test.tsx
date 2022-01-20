import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import StopLimitOrder from './index';

// ================================================:
describe('Stop limit order component:', () => {
	it('Stop limit order component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<StopLimitOrder mode="Buy" balance={2} assetToTradeCode="btc" assetBalanceCode="usdt" />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
