import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'services/constants/env';
import Header from 'layouts-elements/Header';
import AccountSidebar from 'layouts-elements/AccountSidebar';
import Content from 'layouts-elements/Content';
import Footer from 'layouts-elements/Footer';
import { IAccount } from './types';

// ==========================================:
const Account: FC<IAccount> = ({ title, children }) => {
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
						<AccountSidebar />
						<div className="main-content">{children}</div>
					</div>
				</Content>
				<Footer />
			</div>
		</>
	);
};

export default Account;
