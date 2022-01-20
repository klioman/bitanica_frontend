import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import TradesHistoryItem from './index';

// ================================================:
describe('Trades history item component:', () => {
	it('Trades history item component must be render', () => {
		const testData = {
			id: 5,
			order_id: 10,
			matching_order_id: 5,
			pair: 'eth_usdt',
			type: 'market_sell',
			price_requested: null,
			price_filled: 2050,
			asset_sold_id: 13,
			asset_sold_change: 0.11,
			asset_get_id: 10,
			asset_get_change: 225.5,
			fee: 22.55,
			created_at: 1628096871,
		};

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<TradesHistoryItem data={testData} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
