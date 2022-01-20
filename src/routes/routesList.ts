import { isAuth, isGuest } from 'routes/authMiddlewares';

// Static pages:
import ChartPage from 'pages/Static/ChartPage';
import Home from 'pages/Static/Home';
import SpotTrading from 'pages/Static/SpotTrading';

import Login from 'pages/Auth/Login';
import Registration from 'pages/Auth/Registration';
import CreateNewPassword from 'pages/Auth/CreateNewPassword';
import FiatAndSpot from 'pages/Dashboard/FiatAndSpot';
import ForgotPassword from 'pages/Auth/ForgotPassword';
import EmailConfirm from 'pages/Auth/EmailConfirm';
import GeneralSettings from 'pages/Account/GeneralSettings';
import Auth2fa from 'pages/Account/Auth2fa';
import Payments from 'pages/Account/Payments';
import Notifications from 'pages/Account/Notifications';
import IPConfirmation from 'pages/Auth/IPConfirmation';
import DepositCrypto from 'pages/Dashboard/DepositCrypto';
import WithdrawCrypto from 'pages/Dashboard/WithdrawCrypto';
import P2P from 'pages/Dashboard/P2P';
import ConvertPage from 'pages/Static/Convert';
import TransactionHistoryPage from 'pages/Dashboard/TransactionHistoryPage';
import CheckEmail from 'pages/Auth/CheckEmail';
import { IRouteItem } from './types';

// ==========================================:
const navList = {
	home: {
		path: '/',
		component: Home,
	},
	login: {
		path: '/login',
		component: isGuest(Login),
	},
	registration: {
		path: '/registration',
		component: isGuest(Registration),
	},
	emailConfirm: {
		path: '/email-confirm',
		component: isGuest(EmailConfirm),
	},
	emailConfirmCheck: {
		path: '/email-confirm-check',
		component: isGuest(CheckEmail),
	},
	forgotPassword: {
		path: '/forgot-password',
		component: isGuest(ForgotPassword),
	},
	createNewPassword: {
		path: '/create-new-password',
		component: isGuest(CreateNewPassword),
	},
	iPConfirmation: {
		path: '/ip-confirmation',
		component: isGuest(IPConfirmation),
	},
	generalSettings: {
		path: '/general-settings',
		component: isAuth(GeneralSettings),
	},
	auth2faSettings: {
		path: '/auth-2fa',
		component: isAuth(Auth2fa),
	},
	payments: {
		path: '/payments',
		component: isAuth(Payments),
	},
	notifications: {
		path: '/notifications',
		component: isAuth(Notifications),
	},
	fiatAndSpot: {
		path: '/fiat-and-spot',
		component: isAuth(FiatAndSpot),
	},
	p2p: {
		path: '/p2p',
		component: isAuth(P2P),
	},
	depositCrypto: {
		path: '/deposit-crypto',
		component: isAuth(DepositCrypto),
	},
	withdrawCrypto: {
		path: '/withdraw-crypto',
		component: isAuth(WithdrawCrypto),
	},
	convert: {
		path: '/convert',
		component: isAuth(ConvertPage),
	},
	transactionHistory: {
		path: '/transaction-history',
		component: isAuth(TransactionHistoryPage),
	},
	spot: {
		path: '/spot/:pair',
		component: SpotTrading,
	},
	chart: {
		path: '/chart/:pair',
		component: ChartPage,
	},
};

// ==========================================:
const routesList: Array<IRouteItem> = [];

Object.keys(navList).forEach((item) => routesList.push(navList[item as keyof typeof navList]));

export { navList, routesList };
