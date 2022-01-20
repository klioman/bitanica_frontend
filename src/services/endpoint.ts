export const endpoint = {
	auth: {
		LOGIN: '/login',
		REFRESH_TOKEN: '/refresh',
		REGISTRATION: '/register',
		LOGOUT: '/logout',
		RESET_PASSWORD: '/password_reset',
		NEW_PASSWORD: '/user/password',
		RESET_EMAIL_CONFIRM: '/reset-token',
		EMAIL_CONFIRM: '/email_confirmation',
		IP_CONFIRM: '/whitelist_ip',
	},
	settings: {
		USER_SETTINGS: '/user_settings',
		CHANGE_PASSWORD: '/user_settings/change_password',
		ENABLE_2FA: '/settings/2fa/enable',
		DISABLE_2FA: '/settings/2fa/disable',
		GENERATE_2FA_KEY: '/settings/2fa/generate_secret_key',
		CHECK_ENABLED_2FA: '/settings/2fa/check_enabled',
	},
	assetPairs: {
		ASSET_PAIRS: '/assets_pairs',
		ASSET_PAIRS_FEES_AND_LIMITS: '/pairs/fees',
	},
	assets: {
		ASSETS: '/assets',
	},
	spotTrade: {
		ORDER_BOOK: (pair: string) => `/order_book/${pair}`,
		RECENT_TRADES: (pair: string) => `/trades/${pair}`,
		USER_TRADES: '/trades_history',
		USER_OPEN_ORDERS: '/my_orders/opened',
		REMOVE_OPEN_ORDER: (id: number) => `/orders/${id}/cancel`,
		REMOVE_ALL_OPEN_ORDERS: '/order/cancel/all',
		USER_CLOSED_ORDERS: '/my_orders/closed',
	},
	tradingChart: {
		CHART_HISTORY: '/history',
	},
	wallets: {
		WALLETS: '/wallets',
		GENERATE_ADDRESS: (id: number) => `/wallets/${id}/generate_address`,
		WITHDRAWALS_HISTORY: '/wallets/withdrawals',
		DEPOSITS_HISTORY: '/wallets/deposits',
		CRYPTO_HISTORY: '/wallets/transactions',
	},
	orders: {
		CALCULATE_LIMIT_ORDER: '/calculate_limit_order',
		CALCULATE_MARKET_ORDER: '/calculate_market_order',
		CREATE_ORDER: '/orders',
		CREATE_STOP_LIMIT_ORDER: '/stop_limit_orders',
	},
	withdrawCrypto: {
		CHECK_WITHDRAWAL_ADDRESS: '/wallets/check_address',
		SEND_WITHDRAWAL_EMAIL_CODE: '/settings/wallets/send_email_code',
		CONFIRM_CRYPTO_WITHDRAWAL: '/wallets/withdrawal_request',
	},
	convert: {
		EXCHANGE_RATE: '/exchange_rate',
		MAKE_EXCHANGE: '/exchange',
	},
	kyc: {
		START_KYC: '/kyc/start',
		KYC_USER_DATA: '/kyc',
	},
};
