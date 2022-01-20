import { spawn } from 'redux-saga/effects';
import { assetPairsSaga } from './reducers/assetPairs/saga';
import { assetsSaga } from './reducers/assets/saga';
import { authSaga } from './reducers/auth/saga';
import { settingsSaga } from './reducers/settings/saga';
import { socketsSaga } from './reducers/sockets/saga';
import { spotTradeSaga } from './reducers/spotTrade/saga';
import { tradingSettingsSaga } from './reducers/tradingSettings/saga';
import { walletsSaga } from './reducers/wallets/saga';
import { ordersSaga } from './reducers/orders/saga';
import { withdrawCryptoSaga } from './reducers/withdrawCrypto/saga';
import { convertSaga } from './reducers/convert/saga';
import { kycSaga } from './reducers/kyc/saga';

// ==========================================:
export default function* rootSagas() {
	yield spawn(assetPairsSaga);
	yield spawn(assetsSaga);
	yield spawn(authSaga);
	yield spawn(settingsSaga);
	yield spawn(socketsSaga);
	yield spawn(spotTradeSaga);
	yield spawn(tradingSettingsSaga);
	yield spawn(walletsSaga);
	yield spawn(ordersSaga);
	yield spawn(withdrawCryptoSaga);
	yield spawn(convertSaga);
	yield spawn(kycSaga);
}
