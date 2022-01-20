import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import LayoutBar from './index';

// ================================================:
describe('Layout bar component:', () => {
	it('Layout bar component must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<LayoutBar currentLayoutTab="general" handleChangeLayoutBar={() => {}} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
