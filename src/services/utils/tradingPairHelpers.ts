export const transformPairCode = (codeValue: string): string => {
	return codeValue && codeValue.replace('_', '/').toUpperCase();
};

export const getFirstPartPairCode = (codeValue: string): string => {
	return codeValue && codeValue.split('_')[0].toUpperCase();
};

export const getLastPartPairCode = (codeValue: string): string => {
	return codeValue && codeValue.split('_')[1].toUpperCase();
};
