import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Content from 'layouts-elements/Content';
import Header from 'layouts-elements/Header';
import { APP_NAME } from 'services/constants/env';
import { ITrading } from './types';

// ==========================================:
const Trading: FC<ITrading> = ({ children, title }) => {
	const pageTitle = title ? `| ${title}` : '';

	return (
		<>
			<Helmet>
				<title>{`${String(APP_NAME)} ${pageTitle}`}</title>
			</Helmet>
			<div className="wrapper">
				<Header />
				<Content>{children}</Content>
			</div>
		</>
	);
};

export default Trading;
