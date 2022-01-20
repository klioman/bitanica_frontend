import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import OrderBookTable from './index';

// ================================================:
describe('Order book table component:', () => {
	it('Order book table component must be render', () => {
		const dataTest = [
			{
				collapsed: 1,
				price: '58375.6832550000',
				quantity: '0.0615000000',
				quantity_left: '0.0615000000',
				total: '3590.10452018',
			},
		];

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<OrderBookTable data={dataTest} type="ask" />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
