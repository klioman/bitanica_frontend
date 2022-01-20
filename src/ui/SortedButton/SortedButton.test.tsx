import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'redux/store';
import SortedButton from './index';

// ================================================:
describe('Sorted button element:', () => {
	it('Sorted button must be render', () => {
		const testSetSortType = jest.fn();
		const testSetSortMagnitude = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SortedButton
						title="Total"
						sortType=""
						sortOrderType="total"
						setSortType={testSetSortType}
						sortMagnitude="asc"
						setSortMagnitude={testSetSortMagnitude}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);

		expect(container).toBeInTheDocument();
	});
});
