import { MouseEvent } from 'react';

export interface IAssetBarProps {
	currentAssetTab: string;
	handleFilteredAssetPairs: (e: MouseEvent<HTMLButtonElement>) => void;
	selectDropdown: boolean;
	setSelectDropdown: (value: boolean) => void;
}
