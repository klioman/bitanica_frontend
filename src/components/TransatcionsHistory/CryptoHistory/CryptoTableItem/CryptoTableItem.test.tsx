import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import CryptoTableItem from './index';

// ================================================:
describe('Crypto table item component:', () => {
	it('Crypto table item component must be render', () => {
		const testCryptolHistoryItemData = {
			id: 31,
			asset_id: 13,
			hash: 'hash',
			network: 'eth',
			amount: '0.05000000',
			fee: '0.00000000',
			address: '0x266E16Ae64C9baC3A175235500Cc2cb1FF61d460',
			tag: null,
			status: 'processed',
			comment: 'Transaction: 0x9e628625493d2da9d02cc292339bd0de741504e2c153c342c1c7308452545711',
			message: null,
			created_at: 1641310674,
			transaction_type: 'output',
			user_id: 7,
			asset: {
				id: 13,
				code: 'eth',
				type: 'crypto',
				depositable: 1,
				withdrawable: 1,
				exchangeable: 1,
				depositable_message: null,
				withdrawable_message: null,
				chain: 'test',
				decimals: null,
				name: 'Ethereum Test',
				deposit_max: 5,
				deposit_min: 0.01,
				withdraw_max: 5,
				withdraw_min: 0.01,
				exchange_min: 0.01,
				img_path: 'https://7macw4ggmb.corp.merehead.xyz/storage/assets/eth.png',
			},
			asset_code: 'eth',
			tx_url:
				'https://ropsten.etherscan.io/tx/0x9e628625493d2da9d02cc292339bd0de741504e2c153c342c1c7308452545711',
		};

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<CryptoTableItem data={testCryptolHistoryItemData} />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
