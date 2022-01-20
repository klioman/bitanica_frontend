import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import PairsTableItem from './index';

// ================================================:
describe('Pairs table item component:', () => {
	it('Pairs table item component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<PairsTableItem
						pair={{
							active: 1,
							buy_enabled: 1,
							change24h: -0.23,
							change24h_value: -132.035985,
							code: 'btc_usdt',
							high24: 57302.05464,
							id: 1,
							last_price: 56708.750205,
							last_price_usd: 56708.750205,
							low24: 56072.26984,
							sell_enabled: 1,
							view_decimal: 2,
							volume24h: 1.4907,
							volumeQuote24: 84386.7953,
						}}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
