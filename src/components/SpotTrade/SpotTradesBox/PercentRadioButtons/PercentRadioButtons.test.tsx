import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import PercentRadioButtons from './index';

// ================================================:
describe('Percent radio buttons component:', () => {
	it('Percent radio buttons component must be render', () => {
		const testCountOrder = jest.fn();
		const testPercentButtonCountValue = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<PercentRadioButtons
						countOrder={testCountOrder}
						percentButtonCountValue={testPercentButtonCountValue}
						mode="Buy"
					/>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
