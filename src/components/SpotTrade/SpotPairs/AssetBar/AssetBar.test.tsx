import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import AssetBar from './index';

// ================================================:
describe('Asset bar component:', () => {
	it('Asset bar component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<AssetBar
						currentAssetTab="all"
						handleFilteredAssetPairs={() => {}}
						selectDropdown
						setSelectDropdown={() => {}}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
