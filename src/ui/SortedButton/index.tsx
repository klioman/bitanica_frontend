import { FC, MouseEvent, useEffect, memo } from 'react';
import { ISortedButtonProps } from './types';

// ================================================:
const SortedButton: FC<ISortedButtonProps> = ({
	title,
	sortType,
	sortOrderType,
	setSortType,
	sortMagnitude,
	setSortMagnitude,
}) => {
	useEffect(() => {
		if (sortType) {
			setSortMagnitude('asc');
		}
	}, [sortType, setSortMagnitude]);

	const handleSorted = (e: MouseEvent<HTMLButtonElement>) => {
		const { name } = e.currentTarget;

		setSortType(name);

		if (!sortMagnitude) setSortMagnitude('asc');

		if (sortMagnitude === 'asc') setSortMagnitude('desc');

		if (sortMagnitude === 'desc') setSortMagnitude('');
	};

	return (
		<button
			type="button"
			className={`table-header__name table-header__name--btn ${
				sortMagnitude && sortType === sortOrderType ? 'sorted-button-custom active' : ''
			}`}
			name={sortOrderType}
			onClick={handleSorted}
		>
			{String(title)}{' '}
			<div className="td-sort">
				<span
					className={`td-sort__icon td-sort__icon--rotate icon-arrow2 ${
						sortMagnitude === 'desc' && sortType === sortOrderType
							? 'sorted-button-custom-arrow active'
							: ''
					}`}
				/>
				<span
					className={`td-sort__icon icon-arrow2 ${
						sortMagnitude === 'asc' && sortType === sortOrderType
							? 'sorted-button-custom-arrow active'
							: ''
					}`}
				/>
			</div>
		</button>
	);
};

export default memo(SortedButton);
