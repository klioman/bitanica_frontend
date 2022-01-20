import { MouseEvent } from 'react';

export interface ILayoutBarProps {
	currentLayoutTab: string;
	handleChangeLayoutBar: (e: MouseEvent<HTMLButtonElement>) => void;
}
