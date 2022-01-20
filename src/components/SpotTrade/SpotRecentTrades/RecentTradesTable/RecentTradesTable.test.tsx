import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import RecentTradesTable from './index';

// ================================================:
describe('Recent trades table component:', () => {
	it('Recent trades table component must be render', () => {
		const testRecentTradesData = [
			{
				created_at: 1638362783,
				id: 3889,
				pair: 'btc_usdt',
				price: '57075.03820500',
				quantity: '0.00140000',
				type: 'sell',
			},
		];

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<RecentTradesTable data={testRecentTradesData} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
