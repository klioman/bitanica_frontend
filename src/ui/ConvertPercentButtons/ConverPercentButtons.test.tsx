import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import ConvertPercentButtons from './index';

// ================================================:
describe('Convert percent buttons component:', () => {
	it('Convert percent buttons component must be render', () => {
		const testCountFrom = jest.fn();
		const testPercentButtonCountValue = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<ConvertPercentButtons
						countFrom={testCountFrom}
						percentButtonCountValue={testPercentButtonCountValue}
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
