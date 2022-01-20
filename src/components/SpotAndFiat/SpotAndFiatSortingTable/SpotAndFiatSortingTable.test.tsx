import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/store';
import SpotAndFiatSortingTable from './index';

// ================================================:
describe('Spot and fiat sorting table component:', () => {
	it('Spot and fiat sorting table component must be render', () => {
		const testWalletsData = [
			{
				id: 6,
				asset: {
					id: 2,
					code: 'btc',
					type: 'crypto',
					exchangeable: 1,
					chain: 'test',
					decimals: null,
					name: 'Bitcoin Test',
					deposit_max: 999999999,
					deposit_min: 0.001,
					withdraw_max: 999999999,
					withdraw_min: 0.001,
					exchange_min: 0.001,
					img_path: 'https://7macw4ggmb.corp.merehead.xyz/storage/assets/btc.png',
				},
				balance: '1.10106957',
				frozen_balance: '0.00000000',
				total: '1.10106957',
				tag: null,
				has_withdrawal_tag: false,
				btc_value: '1.10106957',
				usd_value: '53795.21',
				networks: [
					{
						network_id: 'default',
						network_name: 'btc',
						withdrawable: 1,
						depositable: 1,
						depositable_message: null,
						withdrawable_message: null,
						top_up_address: 'tb1qrfmlzrm2raesfx09sml0j3x8vfc06lz4y47cq7',
						deposit_fee: 1,
						withdraw_fee: 10,
						withdraw_min: 0.0001,
						withdraw_max: 999999999,
					},
				],
			},
		];

		const { container } = render(
			<ReduxProvider store={store}>
				<BrowserRouter>
					<SpotAndFiatSortingTable data={testWalletsData} balancesIsHide />
				</BrowserRouter>
			</ReduxProvider>,
		);
		expect(container).toBeInTheDocument();
	});
});
