export const getPairFromLocationPath = (path: string): string =>
	path.split('/')?.[2]?.toLowerCase();
