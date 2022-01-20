/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPair } from 'redux/reducers/tradingSettings/reducer';
import { fixedCropNumber } from 'services/utils/fixedCropNumber';
import { IPairsTableItemProps } from './types';

// ================================================:
const PairsTableItem: FC<IPairsTableItemProps> = ({ pair }) => {
	const { code, change24h, last_price, view_decimal } = pair;

	const dispatch = useDispatch();

	const transformAssetPairCode = code?.replace('_', '/').toUpperCase();

	const getTableValueClass = (value: number): string => {
		switch (true) {
			case value > 0:
				return 'table-value table-value--green';
			case value < 0:
				return 'table-value table-value--red';

			default:
				return 'table-value';
		}
	};

	const handleChangePair = () => {
		dispatch(setCurrentPair(code));
	};

	return (
		<div className="tr asset-pair-item" onClick={() => handleChangePair()}>
			<div className="td">
				<div className="favorites-name">
					<button type="button">
						<span className="favorites-name__icon icon-star" />
					</button>
					<span className="favorites-name__text">{transformAssetPairCode}</span>
				</div>
			</div>
			<div className="td">
				<span className={getTableValueClass(Number(last_price))}>
					{fixedCropNumber(last_price, view_decimal) || last_price}
				</span>
			</div>
			<div className="td td--right">
				<span className={getTableValueClass(Number(change24h))}>{change24h}%</span>
			</div>
		</div>
	);
};

export default PairsTableItem;
