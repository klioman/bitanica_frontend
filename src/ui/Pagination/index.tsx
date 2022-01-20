import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { IHandlePage, IPaginationProps } from './types';

// ================================================:
const Pagination: FC<IPaginationProps> = ({ pageCount, forcePage, onPageChange }) => {
	const handlePage = (props: IHandlePage) => {
		const { selected } = props;

		return onPageChange(Number(selected) + 1);
	};

	return (
		<div className="table-footer">
			<ReactPaginate
				pageCount={pageCount}
				pageRangeDisplayed={2}
				marginPagesDisplayed={1}
				containerClassName="pagination"
				nextLabel={<span className="arrow__icon icon-arrow-5" />}
				previousLabel={<span className="arrow--left arrow__icon icon-arrow-5" />}
				activeClassName="active"
				forcePage={forcePage}
				onPageChange={handlePage}
			/>
		</div>
	);
};

export default Pagination;
