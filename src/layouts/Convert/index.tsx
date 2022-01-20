import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'services/constants/env';
import Header from 'layouts-elements/Header';
import Content from 'layouts-elements/Content';
import Footer from 'layouts-elements/Footer';
import { IConvert } from './types';

// ==========================================:
const Convert: FC<IConvert> = ({ title, children }) => {
	const pageTitle = title ? `| ${title}` : '';

	return (
		<>
			<Helmet>
				<title>{`${String(APP_NAME)} ${pageTitle}`}</title>
			</Helmet>
			<div className="wrapper">
				<Header />
				<Content>{children}</Content>
				<Footer />
			</div>
		</>
	);
};

export default Convert;
