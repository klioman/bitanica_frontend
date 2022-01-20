export const dataFromRange = (start: number, end: number): number[] => {
	const arr = [];

	for (let i = start; i <= end; i += 1) {
		arr.push(i);
	}

	return arr;
};
