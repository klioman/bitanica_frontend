/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { intervals } from '../helpers/interval';
import historyProvider from './historyProvider';
import stream, { updateBarBySockets } from './stream';

export const addZeroAfterPoint = (n) => {
	if (n > 1) {
		return `0${addZeroAfterPoint(n - 1)}`;
	}
	return '0';
};

const supportedResolutions = Object.keys(intervals);
const config = {
	supported_resolutions: supportedResolutions,
};
const hosting = { resolution: '1D', decimal: 8 };
export const setChartDecimal = (dec) => {
	hosting.decimal = dec;
};
export default {
	onReady: (cb) => {
		setTimeout(() => cb(config), 0);
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		// const split_data = symbolName.split('/');
		const symbol_stub = {
			name: symbolName || 'BTCUSD',
			description: symbolName,
			type: 'crypto',
			session: '24x7',
			// timezone: 'Eth/UTC+2',
			// ticker: symbolName,
			// exchange: split_data[0],
			minmov: 1,
			pointvalue: 8,
			pricescale: +`1${addZeroAfterPoint(hosting.decimal)}`,
			has_intraday: true,
			// intraday_multipliers: ['1', '60'],
			supported_resolution: supportedResolutions,
			volume_precision: 8,
			// data_status: 'streaming',
		};
		setTimeout(() => {
			onSymbolResolvedCallback(symbol_stub);
		}, 0);

		// onResolveErrorCallback('Not feeling it today')
	},
	getBars: (
		symbolInfo,
		resolution,
		from,
		to,
		onHistoryCallback,
		onErrorCallback,
		firstDataRequest,
	) => {
		historyProvider
			.getBars(symbolInfo, hosting.resolution, from, to, firstDataRequest)
			.then((bars) => {
				if (bars.length) {
					onHistoryCallback(bars, { noData: false });
				} else {
					onHistoryCallback(bars, { noData: true });
				}
			})
			.catch((err) => {
				onErrorCallback(err);
			});
	},
	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		stream.subscribeBars(
			symbolInfo,
			hosting.resolution,
			onRealtimeCallback,
			subscribeUID,
			onResetCacheNeededCallback,
		);
		updateBarBySockets(historyProvider.current);
	},
	unsubscribeBars: (subscriberUID) => {
		// console.log('=====unsubscribeBars running');
		stream.unsubscribeBars(subscriberUID);
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		// optional
		hosting.resolution =
			resolution === 'D' && resolutionBack === 'M' && intervalBack === 12 ? '1M' : resolution;
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution;
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		// optional
		// console.log('=====getMarks running', {
		//   symbolInfo,
		//   startDate,
		//   endDate,
		//   onDataCallback,
		//   resolution,
		// });
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		// optional
		// console.log('=====getTimeScaleMarks running');
	},
	getServerTime: (cb) => {
		// console.log(cb);
		// cb(new Date().getTime());
		// console.log('=====getServerTime running', cb);
	},
};
