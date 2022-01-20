/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPaginationProps {
	pageCount: number;
	forcePage: number;
	onPageChange: any;
}

export interface IHandlePage {
	selected: number;
}
