export const trimComment = (comment: string): string => {
	const leftPart = comment?.slice(0, 8);
	const rigthPart = comment?.slice(-8);

	return `${leftPart}...${rigthPart}`;
};

export const trimAddress = (address: string): string => {
	const leftPart = address?.slice(0, 8);
	const rigthPart = address?.slice(-8);

	return `${leftPart}...${rigthPart}`;
};

export const trimTransactionHash = (hash: string): string => {
	const leftPart = hash?.slice(13, 21);
	const rigthPart = hash?.slice(-8);

	return `${leftPart}...${rigthPart}`;
};
