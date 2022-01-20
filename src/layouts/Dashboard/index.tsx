import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'services/constants/env';
import Header from 'layouts-elements/Header';
import WalletSidebar from 'layouts-elements/WalletSidebar';
import Content from 'layouts-elements/Content';
import Footer from 'layouts-elements/Footer';
import { IDashboard } from './types';

// ==========================================:
const Dashboard: FC<IDashboard> = ({ children, title }) => {
	const pageTitle = title ? `| ${title}` : '';

	return (
		<>
			<Helmet>
				<title>{`${String(APP_NAME)} ${pageTitle}`}</title>
			</Helmet>
			<div className="wrapper">
				<Header />
				<Content>
					<div className="content-inner">
						<WalletSidebar />
						<div className="main-content">{children}</div>
					</div>
				</Content>
				<Footer />
			</div>
		</>
	);
};

export default Dashboard;
