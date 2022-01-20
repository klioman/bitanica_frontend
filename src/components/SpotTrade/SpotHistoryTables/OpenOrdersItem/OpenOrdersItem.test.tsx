import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import OpenOrdersItem from './index';

// ================================================:
describe('Open orders item component:', () => {
	it('Open orders item component must be render', () => {
		const testData = {
			id: 1,
			user_id: 2,
			type: 'sell',
			pair: 'eth_usdt',
			want_asset_id: 10,
			offer_asset_id: 13,
			filled: null,
			price: '2200.00000000',
			quantity: '0.01000000',
			quantity_left: '0.01000000',
			status: null,
			average: null,
			trigger_conditions: '2150.00000000000000000000',
			updated_at: 1628096970,
			created_at: 1628096970,
			total: 22,
			filling: 0,
		};

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<OpenOrdersItem data={testData} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
