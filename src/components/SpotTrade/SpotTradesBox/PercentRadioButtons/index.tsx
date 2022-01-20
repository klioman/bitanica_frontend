import { FC, useEffect, MouseEvent, useState } from 'react';
import { IPercentRadioButtonsProps } from './types';

const PercentRadioButtons: FC<IPercentRadioButtonsProps> = ({
	countOrder,
	percentButtonCountValue,
	amount,
}) => {
	const [currentPercent, setCurrentPercent] = useState(0);

	const handleClickPercentButtons = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		countOrder(percentButtonCountValue(Number(name)));
		setCurrentPercent(Number(name));
	};

	const PERCENTS = [0, 0.25, 0.5, 0.75, 1];

	useEffect(() => {
		if (!amount || Number(amount) === 0) {
			setCurrentPercent(0);
		}
	}, [amount]);

	return (
		<div className="trade-form__item">
			<div className="part-check">
				{PERCENTS.map((percent) => (
					<div className="radio part-check__item" key={percent}>
						<button
							type="button"
							name={String(percent)}
							className={`radio__item ${percent === currentPercent ? 'active' : ''}`}
							onClick={handleClickPercentButtons}
						>
							{percent * 100}%
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default PercentRadioButtons;
