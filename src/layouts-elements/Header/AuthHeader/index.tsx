import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import L from 'i18n-react';
import { logoutRequest } from 'redux/reducers/auth/reducer';
import HeaderDropdown from 'ui/HeaderDropdown';
import { IHeaderDropdownList } from './types';

// ==========================================:
const AuthHeader: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSelect = (value: IHeaderDropdownList): void => {
		if (value.link === '/logout') {
			dispatch(logoutRequest({ history }));
		}

		history.push(value.link);
	};

	const accountList = [
		{
			order: 1,
			name: `${String(L.translate('Menu.Account.account_settings'))}`,
			icon: 'icon-settings',
			link: '/general-settings',
		},
		{
			order: 2,
			name: `${String(L.translate('Menu.Account.log_out'))}`,
			icon: 'icon-Logout',
			link: '/logout',
		},
	];

	const walletList = [
		{
			order: 1,
			name: `${String(L.translate('Menu.Wallet.fiat_and_spot'))}`,
			icon: 'icon-money-recive',
			link: '/fiat-and-spot',
		},
		{
			order: 2,
			name: 'P2P',
			icon: 'icon-user',
			link: '/p2p',
		},
		{
			order: 3,
			name: `${String(L.translate('Menu.Wallet.margin'))}`,
			icon: 'icon-trade',
			link: '/margin',
		},
		{
			order: 4,
			name: `${String(L.translate('Menu.Wallet.transaction_history'))}`,
			icon: 'icon-Paper',
			link: '/transaction-history',
		},
	];

	return (
		<>
			<HeaderDropdown
				placeholder={`${String(L.translate('Menu.Wallet.wallet'))}`}
				placeholderIcon="icon-wallet"
				onChange={handleSelect}
				options={walletList}
			/>

			<div className="select header__select">
				<button type="button" className="select__current">
					<span className="select__icon icon-document" />
					Orders
					<span className="select__arrow icon-arrow2" />
				</button>
				<div className="select__drop">
					<div className="select__drop-scroll">
						<div className="select__drop-item">
							<a href="/" className="select__drop-link">
								<span className="select__drop-icon icon-money-recive" />
								<span className="select__drop-text">Spot Order</span>
							</a>
						</div>
						<div className="select__drop-item">
							<a href="/" className="select__drop-link">
								<span className="select__drop-icon icon-trade" />
								<span className="select__drop-text">Margin Order</span>
							</a>
						</div>
						<div className="select__drop-item">
							<a href="/" className="select__drop-link">
								<span className="select__drop-icon icon-user" />
								<span className="select__drop-text">P2P Order</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<HeaderDropdown
				placeholder={`${String(L.translate('Menu.Account.account'))}`}
				placeholderIcon="icon-profile-circle"
				onChange={handleSelect}
				options={accountList}
			/>
		</>
	);
};

export default AuthHeader;
