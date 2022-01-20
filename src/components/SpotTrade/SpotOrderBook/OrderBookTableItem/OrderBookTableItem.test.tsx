import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import OrderBookTableItem from './index';

// ================================================:
describe('Order book table item component:', () => {
	it('Order book table item component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<OrderBookTableItem
						data={{
							collapsed: 1,
							price: '58375.6832550000',
							quantity: '0.0615000000',
							quantity_left: '0.0615000000',
							total: '3590.10452018',
						}}
						type="ask"
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
