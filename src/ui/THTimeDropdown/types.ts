// ==================================:
export interface ITHDropdown {
	placeholder?: string;
	value: number | null;
	onChange: (selectedValue: number) => void;
	options: Array<number> | null;
}
