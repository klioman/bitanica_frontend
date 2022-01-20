import { forwardRef } from 'react';
import { IDatepickerProps } from './types';

// ================================================:
const DatepickerSearch = forwardRef((props: IDatepickerProps, ref: React.Ref<HTMLInputElement>) => {
	const { onClick, value } = props;
	return (
		<>
			<input
				onClick={onClick}
				value={value}
				type="text"
				readOnly
				ref={ref}
				placeholder="YYYY-MM-DD - YYYY-MM-DD"
				className="input-item input-item--left-icon"
			/>
			<div className="input-icon">
				<span className="date-form__icon icon-Calendar" />
			</div>
		</>
	);
});

export default DatepickerSearch;
