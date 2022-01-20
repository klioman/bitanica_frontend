import { FC, useEffect, useRef, useState } from 'react';
import { IWalletItem } from 'redux/reducers/wallets/types';
import { IDCDropdown } from './types';

// ================================================:
const DCDropdown: FC<IDCDropdown> = (props) => {
	const { value, options, placeholder = 'Select coin...', onChange } = props;

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

	const handleChange = (selectedValue: IWalletItem): void => {
		onChange(selectedValue);
		setOpen(false);
	};

	const handleSelectToggel = (): void => {
		setOpen(!open);
	};

	return (
		<div
			className={`select select select--regular select--regular2 ${open ? 'active' : ''}`}
			ref={node}
		>
			<button type="button" className="select__current" onClick={handleSelectToggel}>
				{value?.asset?.name ? (
					<>
						<div className="select__icon">
							<img src={value?.asset?.img_path} width="24" height="24" alt="" />
						</div>
						{value?.asset?.code?.toUpperCase()}
						<span className="select__current-currency">{value?.asset?.name}</span>
					</>
				) : (
					<span className="select__current-currency">{placeholder}</span>
				)}
				<span className="select__arrow icon-arrow2" />
			</button>
			{open && options && (
				<div className="select__drop">
					<div className="select__drop-scroll">
						{options?.map((opt: IWalletItem) => {
							return (
								<div className="select__drop-item" key={opt?.id}>
									<button
										type="button"
										className="select__drop-link"
										onClick={() => handleChange(opt)}
									>
										<img width="30" height="30" src={opt?.asset?.img_path} alt="" />
										<span className="select__drop-text">{opt?.asset?.name}</span>
									</button>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default DCDropdown;
