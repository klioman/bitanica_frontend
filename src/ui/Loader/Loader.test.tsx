import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'redux/store';
import Loader from 'ui/Loader';

// ================================================:
describe('Loader element:', () => {
	it('Loader element must be render', () => {
		const renderLoader = render(<Loader />);
		expect(renderLoader.container).toBeInTheDocument();

		let isLoad = false;
		const loaderRender = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					{isLoad && (
						<div className="loader-wrapper">
							<Loader />
						</div>
					)}
				</BrowserRouter>
			</ReduxProvider>,
		);

		expect(loaderRender.container.getElementsByClassName('loader-wrapper').length).toBe(0);

		isLoad = true;
		const loaderNotRender = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					{isLoad && (
						<div className="loader-wrapper">
							<Loader />
						</div>
					)}
				</BrowserRouter>
			</ReduxProvider>,
		);

		expect(loaderNotRender.container.getElementsByClassName('loader-wrapper').length).toBe(1);
	});
});
