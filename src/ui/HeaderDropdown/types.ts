import { IHeaderDropdownList } from 'layouts-elements/Header/AuthHeader/types';

// ==================================:
export interface IHeaderDropdown {
	placeholder?: string;
	value?: string;
	placeholderIcon?: string | undefined;
	onChange: (selectedValue: IHeaderDropdownList) => void;
	options: Array<IHeaderDropdownList>;
}
