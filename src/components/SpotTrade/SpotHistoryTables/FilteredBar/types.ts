export interface IFilteredBarProps {
	period?: null | number;
	setCurrentPeriod: (val: number) => void;
	handleSearch: (val: [Date | null, Date | null]) => void;
	handleSearchPerPeriod: (val: number | null) => void;
}
