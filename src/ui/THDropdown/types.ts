// ==================================:
export interface ITHDropdown {
	placeholder?: string;
	value: string | null;
	onChange: (selectedValue: string) => void;
	options: Array<string> | null;
}
