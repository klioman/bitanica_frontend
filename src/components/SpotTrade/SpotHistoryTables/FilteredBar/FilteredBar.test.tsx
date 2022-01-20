import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import FilteredBar from './index';

// ================================================:
describe('Filtered bar component:', () => {
	it('Filtered bar component must be render', () => {
		const setCurrentPeriod = jest.fn();
		const handleSearch = jest.fn();
		const handleSearchPerPeriod = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<FilteredBar
						period={1}
						setCurrentPeriod={setCurrentPeriod}
						handleSearch={handleSearch}
						handleSearchPerPeriod={handleSearchPerPeriod}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
