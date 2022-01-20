export interface IPercentRadioButtonsProps {
	countOrder: (val: number) => void;
	percentButtonCountValue: (val: number) => number;
	mode: string;
	amount?: string;
}
