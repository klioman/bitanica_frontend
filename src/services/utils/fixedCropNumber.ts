export const fixedCropNumber = (numberValue: number, digitCount: number) => {
	return Math.trunc(numberValue * 10 ** digitCount) / 10 ** digitCount;
};
