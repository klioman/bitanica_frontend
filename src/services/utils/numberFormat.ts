export const numberFormat = (value: number, format: string) => {
	const transformNumber = new Intl.NumberFormat(format, { maximumFractionDigits: 2 }).format(value);

	return transformNumber;
};
