export const numberValidation = (text: string): boolean => {
	if (text?.length >= 2 && text?.[0] === '0' && text?.[1] !== '.') return false;

	return /^[0-9]*\.?[0-9]*$/.test(text);
};
