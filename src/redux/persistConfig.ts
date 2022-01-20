import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'bit-f',
	storage,
	transforms: [
		encryptTransform({
			secretKey: 'rT2FZ5y9f9',
			onError: (error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			},
		}),
	],
	whitelist: ['auth', 'tradingSettings'],
};

export { persistConfig };
