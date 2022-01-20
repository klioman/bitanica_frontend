import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import { accountList } from 'services/constants/testLoginCredentials';
import HeaderDropdown from './index';

// ================================================:
describe('Header dropdown component:', () => {
	it('Header dropdown component must be render', () => {
		const handleChange = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<HeaderDropdown onChange={handleChange} options={accountList} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
