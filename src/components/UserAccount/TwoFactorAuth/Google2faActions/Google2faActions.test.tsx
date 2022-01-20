import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import Google2faActions from './index';

// ================================================:
describe('Google 2fa actions component:', () => {
	it('Google 2fa actions component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<Google2faActions />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
