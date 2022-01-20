/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { endpoint } from 'services/endpoint';
import { http } from 'services/http';
import { ITradingChartApi } from './types';

// ==========================================:
export const tradingChart: ITradingChartApi = {
	getChartHistory: ({ params }) =>
		http
			.get<any>(endpoint.tradingChart.CHART_HISTORY, { params })
			.then((response) => response.data),
};
