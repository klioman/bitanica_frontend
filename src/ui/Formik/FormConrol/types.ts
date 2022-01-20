import { ReactNode } from 'react';

export interface IAdminFormConrol {
	type: string;
	children: ReactNode;
	setIsShowPass?: (isShowPass: boolean) => void;
	isShowPass?: boolean;
	title?: string | undefined;
	ariaLabel?: string;
	fieldIcon?: ReactNode;

	// TODO - add types
	form?: any;
	field?: any;
}
