import { FC, useEffect, useRef, useState } from 'react';
import { IWalletItem } from 'redux/reducers/wallets/types';
import { ITHAssetDropdownProps } from './types';

// ================================================:
const THAssetDropdown: FC<ITHAssetDropdownProps> = (props) => {
	const { value, options, onChange } = props;

	const [open, setOpen] = useState(false);
	const node = useRef<HTMLDivElement | null>(null);

	const handleClick = (event: MouseEvent): boolean | undefined => {
		if (node?.current?.contains(event.target as Node)) {
			return false;
		}

		setOpen(false);
		return true;
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const handleChange = (selectedItem: IWalletItem | string): void => {
		onChange(selectedItem);
		setOpen(false);
	};

	const handleSelectToggel = (): void => {
		setOpen(!open);
	};

	return (
		<div
			className={`transactions__select select select--regular details-list__select ${
				open ? 'active' : ''
			}`}
			ref={node}
		>
			<button type="button" className="select__current" onClick={handleSelectToggel}>
				{typeof value === 'object' ? (
					<>{value?.asset?.code?.toUpperCase()}</>
				) : (
					<span className="select__current-currency">{value?.toUpperCase()}</span>
				)}
				<span className="select__arrow icon-arrow2" />
			</button>

			{open && options && (
				<div className="select__drop">
					<div className="select__drop-scroll">
						<div className="select__drop-item">
							<button
								type="button"
								className="select__drop-link"
								onClick={() => handleChange('All')}
							>
								<span className="select__drop-text">All</span>
							</button>
						</div>
						{options?.map((opt: IWalletItem) => (
							<div className="select__drop-item" key={opt.id}>
								<button
									type="button"
									className="select__drop-link"
									onClick={() => handleChange(opt)}
								>
									<span className="select__drop-text">{opt?.asset?.code?.toUpperCase()}</span>
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default THAssetDropdown;
