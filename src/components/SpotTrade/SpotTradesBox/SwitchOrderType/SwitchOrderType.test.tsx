import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import SwitchOrderType from './index';

// ================================================:
describe('Limit order component:', () => {
	it('Limit order component must be render', () => {
		const testAssetData = {
			buy: { code: 'usdt', balance: 0 },
			sell: { code: 'btc', balance: 0 },
		};

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SwitchOrderType orderType="limit_order" mode="buy" asset={testAssetData} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
