import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import DatepickerSearch from 'ui/DatepickerSearch';
import { IFilteredBarProps } from './types';
import 'react-datepicker/dist/react-datepicker.css';

// ================================================:
const FilteredBar: FC<IFilteredBarProps> = ({
	period,
	setCurrentPeriod,
	handleSearch,
	handleSearchPerPeriod,
}) => {
	const PERIOD = ['1 Day', '1 Week', '1 Month', '3 Month'];

	const defaultData: [Date | null, Date | null] = [null, null];

	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(defaultData);
	const [startDateV, endDateV] = dateRange;

	const handlePeriodClick = (indexValue: number) => {
		handleSearchPerPeriod(indexValue);
		setCurrentPeriod(indexValue);

		setDateRange(defaultData);
	};

	return (
		<div className="market-footer__filter">
			<div className="date-filter">
				{PERIOD.map((element, index) => (
					<button
						key={element}
						onClick={() => handlePeriodClick(index)}
						className={`
              date-filter__btn ${period === index ? 'date-filter__btn--active' : ''}
              `}
						type="button"
					>
						{element}
					</button>
				))}
			</div>
			<div className="date-form">
				<div className="input input--margin-none date-form__input">
					<div className="input-wrapper">
						<DatePicker
							customInput={<DatepickerSearch />}
							selectsRange
							startDate={startDateV}
							endDate={endDateV}
							placeholderText="Select start and end date..."
							onChange={(update) => {
								if (Array.isArray(update)) {
									setDateRange(update);
								}
							}}
							isClearable
							dateFormat="yyyy.MM.dd"
							selectsStart
						/>
						<div className="input-icon">
							<span className="date-form__icon icon-Calendar" />
						</div>
					</div>
				</div>
				<button className="date-form__btn" type="button" onClick={() => handleSearch(dateRange)}>
					Search
				</button>
			</div>
		</div>
	);
};

export default FilteredBar;
