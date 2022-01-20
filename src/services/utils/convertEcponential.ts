export function convertExponentialToDecimal(exponentialNumber: number): number | string {
	const str = exponentialNumber?.toString();

	if (str.indexOf('e') !== -1) {
		const exponent = parseInt(str.split('-')[1], 10);
		const result = exponentialNumber.toFixed(exponent);

		return result;
	}
	return exponentialNumber;
}
