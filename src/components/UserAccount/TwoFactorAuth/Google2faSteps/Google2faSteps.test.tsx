import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import Google2faSteps from './index';

// ================================================:
describe('Google 2fa steps component:', () => {
	it('TGoogle 2fa steps component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<Google2faSteps data={{ QR_Image: 'Test', secret: 'test', reauthenticating: true }} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
