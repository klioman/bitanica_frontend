import { FC } from 'react';
import { ILayoutBarProps } from './types';

const LayoutBar: FC<ILayoutBarProps> = ({ currentLayoutTab, handleChangeLayoutBar }) => {
	return (
		<div className="orderbook__sort">
			<button
				className={`orderbook__sort-btn ${
					currentLayoutTab === 'general' ? 'orderbook__sort-btn--active' : ''
				}`}
				type="button"
				name="general"
				onClick={handleChangeLayoutBar}
			>
				<span className="icon-sort">
					<span className="path1" />
					<span className="path2" />
					<span className="path3" />
				</span>
			</button>
			<button
				className={`orderbook__sort-btn ${
					currentLayoutTab === 'bid' ? 'orderbook__sort-btn--active' : ''
				}`}
				type="button"
				name="bid"
				onClick={handleChangeLayoutBar}
			>
				<span className="icon-sort2">
					<span className="path1" />
					<span className="path2" />
					<span className="path3" />
				</span>
			</button>
			<button
				className={`orderbook__sort-btn ${
					currentLayoutTab === 'ask' ? 'orderbook__sort-btn--active' : ''
				}`}
				type="button"
				name="ask"
				onClick={handleChangeLayoutBar}
			>
				<span className="icon-sort3">
					<span className="path1" />
					<span className="path2" />
					<span className="path3" />
				</span>
			</button>
		</div>
	);
};

export default LayoutBar;
