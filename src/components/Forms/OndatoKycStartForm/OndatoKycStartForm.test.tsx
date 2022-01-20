import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import OndatoKycStartForm from './index';

// ================================================:
describe('Ondato kyc start form component:', () => {
	it('Ondato kyc start form component must be render', () => {
		const testStartOndatoKycSubmit = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<OndatoKycStartForm startOndatoKycSubmit={testStartOndatoKycSubmit} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
