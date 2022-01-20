export const windowReference = (url: string) => {
	const a = document.createElement('a');

	a.href = url;

	a.target = '_blank';
	// a.onclick = "this.target='_blank';";

	a.click();
};
