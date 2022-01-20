import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { History } from 'history';

import app from 'redux/reducers/app/reducer';
import assetPairs from 'redux/reducers/assetPairs/reducer';
import assets from 'redux/reducers/assets/reducer';
import auth from 'redux/reducers/auth/reducer';
import settings from 'redux/reducers/settings/reducer';
import sockets from 'redux/reducers/sockets/reducer';
import spotTrade from 'redux/reducers/spotTrade/reducer';
import tradingSettings from 'redux/reducers/tradingSettings/reducer';
import wallets from 'redux/reducers/wallets/reducer';
import orders from 'redux/reducers/orders/reducer';
import withdrawCrypto from 'redux/reducers/withdrawCrypto/reducer';
import convert from 'redux/reducers/convert/reducer';
import kyc from 'redux/reducers/kyc/reducer';

// ==========================================:
const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		loadingBar: loadingBarReducer,
		app,
		assetPairs,
		assets,
		auth,
		settings,
		sockets,
		spotTrade,
		tradingSettings,
		wallets,
		orders,
		withdrawCrypto,
		convert,
		kyc,
	});

export default createRootReducer;
