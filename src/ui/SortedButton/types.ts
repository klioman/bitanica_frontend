export interface ISortedButtonProps {
	title: string;
	sortType: string;
	sortOrderType: string;
	setSortType: (val: string) => void;
	sortMagnitude: string;
	setSortMagnitude: (val: string) => void;
}
