import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import SpotTradeWithoutOrderBookAndTradingPairs from './index';

// ================================================:
describe('Spot trade without orderbook and trading pairs component:', () => {
	it('Spot trade without orderbook and trading pairs component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SpotTradeWithoutOrderBookAndTradingPairs />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
