import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import SocketWithTopicConnectWrapper from './index';

// ================================================:
describe('SocketWith topic connect wrapper:', () => {
	it('SocketWith topic connect wrapper must be render', () => {
		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SocketWithTopicConnectWrapper topicName="test">
						<div>Test component</div>
					</SocketWithTopicConnectWrapper>
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
