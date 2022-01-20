import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import UserKycOndatoPopup from './index';

// ================================================:
describe('User kyc ondato popup component:', () => {
	it('User kyc ondato popup component must be render', () => {
		const testCloseModal = jest.fn();
		const testSetIosLink = jest.fn();

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<UserKycOndatoPopup openModal closeModal={testCloseModal} setIosLink={testSetIosLink} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
