export const getLocaleTimeFromTimestamp = (timestamp: number): string =>
	new Date(timestamp * 1000).toLocaleTimeString();

export const getLocaleDateFromTimestamp = (timestamp: number): string =>
	new Date(timestamp * 1000).toLocaleDateString();
