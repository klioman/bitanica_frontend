import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'services/constants/env';

// Layouts elements:
import Header from 'layouts-elements/Header';
import Content from 'layouts-elements/Content';
import Footer from 'layouts-elements/Footer';

// Home blocks:
import BuySellCrypto from 'components/HomeBlocks/BuySellCrypto';
import TopCryptocurrencies from 'components/HomeBlocks/TopCryptocurrencies';
import BitanicaCoinInfo from 'components/HomeBlocks/BitanicaCoinInfo';
import BitanicaTextTrage from 'components/HomeBlocks/BitanicaTextTrage';
import BitanicaTextInfo from 'components/HomeBlocks/BitanicaTextInfo';
import BitanicaInfo from 'components/HomeBlocks/BitanicaInfo';

// ==========================================:
const Home: FC = () => {
	return (
		<>
			<Helmet>
				<title>{`${String(APP_NAME)}`}</title>
			</Helmet>

			<div className="wrapper">
				<Header />
				<Content>
					<div className="content-wrapper content-wrapper--padding">
						<BuySellCrypto />
						<TopCryptocurrencies />
						<BitanicaCoinInfo />
						<div className="page-bg">
							<BitanicaTextTrage />
							<BitanicaTextInfo />
						</div>
						<BitanicaInfo />
					</div>
				</Content>
				<Footer />
			</div>
		</>
	);
};

export default Home;
