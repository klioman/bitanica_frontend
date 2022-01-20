import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'services/constants/env';
import Header from 'layouts-elements/Header';
import Content from 'layouts-elements/Content';
import Footer from 'layouts-elements/Footer';
import { IHistory } from './types';

// ==========================================:
const History: FC<IHistory> = ({ children, title }) => {
	const pageTitle = title ? `| ${title}` : '';

	return (
		<>
			<Helmet>
				<title>{`${String(APP_NAME)} ${pageTitle}`}</title>
			</Helmet>
			<div className="wrapper">
				<Header />
				<Content>
					<div className="content-inner content-inner--padding">{children}</div>
				</Content>
				<Footer />
			</div>
		</>
	);
};

export default History;
