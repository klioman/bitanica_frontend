import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import PairsTable from './index';

// ================================================:
describe('Pairs table component:', () => {
	it('Pairs table component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<PairsTable
						workspaceSettings={{ orderBookSection: true, tradingPairsSection: true }}
						searchData=""
						currentAssetData="all"
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
