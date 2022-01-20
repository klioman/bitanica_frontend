import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import SocketWithPrivateTopicConnectWrapper from './index';

// ================================================:
describe('Socket with private topic connect wrapper:', () => {
	it('Socket with private topic connect wrapper must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SocketWithPrivateTopicConnectWrapper topicName="test">
						<div>Test component</div>
					</SocketWithPrivateTopicConnectWrapper>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
