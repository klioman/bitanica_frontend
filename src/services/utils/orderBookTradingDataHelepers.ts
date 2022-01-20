import { IOrderBookAskData, IOrderBookBidData } from 'redux/reducers/spotTrade/types';

export const filteredOrderbookDataByTab = (
	data: Array<IOrderBookAskData> | Array<IOrderBookBidData> | undefined,
	currentTab: string,
	type: string,
) => {
	if (currentTab === 'general') {
		if (type === 'ask') {
			const reverseData = data?.length ? [...data].reverse() : null;
			reverseData?.length ? reverseData.filter((_, idx) => idx < 15) : null;

			return reverseData?.length ? [...reverseData].reverse() : null;
		}
		return data?.length ? data.filter((_, idx) => idx < 15) : null;
	}

	return data?.length ? data : null;
};
