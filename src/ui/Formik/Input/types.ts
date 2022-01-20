/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdminInput {
	type: string;
	ariaLabel?: string;
	placeholder?: string;
	name: string;
	autoFocus?: boolean;
	inputMode: any; // TODO - add types
	field: any; // TODO - add types
	onKeyUp?: any; // TODO - add types
}
