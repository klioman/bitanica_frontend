import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import GeneralSettings from './index';

// ================================================:
describe('General settings page:', () => {
	it('General settings page must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<GeneralSettings />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
