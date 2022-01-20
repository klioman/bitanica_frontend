import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import DatepickerSearch from './index';

// ================================================:
describe('Datepicker search component:', () => {
	it('Datepicker search component must be render', () => {
		const onClick = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<DatepickerSearch onClick={onClick} value="2021.12.13" />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
