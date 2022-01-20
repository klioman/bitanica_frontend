import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import OrdersHistoryItem from './index';

// ================================================:
describe('Orders history item component:', () => {
	it('Orders history item component must be render', () => {
		const testData = {
			id: 3,
			user_id: 2,
			type: 'buy',
			pair: 'eth_usdt',
			want_asset_id: 13,
			offer_asset_id: 10,
			price: '2100.00000000',
			quantity: '0.10000000',
			quantity_left: '0.10000000',
			status: 'cancelled',
			average: 0,
			updated_at: 1628076483,
			created_at: 1628076403,
			total: 210,
			filling: 0,
		};

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<OrdersHistoryItem data={testData} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
