import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import UserTradesTableItem from './index';

// ================================================:
describe('User trades table item component:', () => {
	it('User trades table item component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<UserTradesTableItem
						data={{
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
						}}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
