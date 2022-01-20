import { FC, useEffect, useRef, useState } from 'react';
import { IWalletNetworkItem } from 'redux/reducers/wallets/types';
import { IDCNDropdown } from './types';

// ================================================:
const DCNDropdown: FC<IDCNDropdown> = (props) => {
	const { value, options, placeholder = 'Select network', onChange } = props;

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

	const handleChange = (selectedValue: IWalletNetworkItem): void => {
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
				{value?.network_name ? (
					<>
						{value?.network_name.toUpperCase()}
						<span className="select__current-currency">{value?.network_name}</span>
					</>
				) : (
					<span className="select__current-currency">{placeholder}</span>
				)}
				<span className="select__arrow icon-arrow2" />
			</button>

			{open && options && (
				<div className="select__drop">
					<div className="select__drop-scroll">
						{options?.map((opt: IWalletNetworkItem) => {
							return (
								<div className="select__drop-item" key={opt?.network_id}>
									<button
										type="button"
										className="select__drop-link"
										onClick={() => handleChange(opt)}
									>
										<span className="select__drop-text">{opt?.network_name.toUpperCase()}</span>
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

export default DCNDropdown;
