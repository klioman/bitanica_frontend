import { FC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { appLanguage } from 'redux/reducers/app/selectors';
import { routesList } from 'routes/routesList';
import { languages } from 'languages';
import SocketConnectWrapper from 'components/SocketConnectWrapper';
import SocketWithPrivateTopicConnectWrapper from 'components/SocketWithPrivateTopicConnectWrapper';

// ==========================================:
const App: FC = () => {
	const language = useSelector(appLanguage);
	L.setTexts(languages[language]);

	return (
		<BrowserRouter>
			<SocketConnectWrapper>
				<SocketWithPrivateTopicConnectWrapper topicName="private-notifications">
					<Switch>
						{routesList?.map((route) => (
							<Route key={route.path} exact path={route.path} component={route.component} />
						))}
						<Redirect to="/" />
					</Switch>
				</SocketWithPrivateTopicConnectWrapper>
			</SocketConnectWrapper>
		</BrowserRouter>
	);
};

export default App;
