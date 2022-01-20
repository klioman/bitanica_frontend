import { FC, useEffect, useRef, useState } from 'react';
import { ITHDropdown } from './types';

// ==================================:
const THDropdown: FC<ITHDropdown> = (props) => {
	const { value, options, placeholder = 'Select ...', onChange } = props;

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

	const handleChange = (selectedValue: string): void => {
		onChange(selectedValue);
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
				{value ? (
					<>{value?.toUpperCase()}</>
				) : (
					<span className="select__current-currency">{placeholder}</span>
				)}
				<span className="select__arrow icon-arrow2" />
			</button>

			{open && options && (
				<div className="select__drop">
					<div className="select__drop-scroll">
						{options?.map((opt: string) => (
							<div className="select__drop-item" key={opt}>
								<button
									type="button"
									className="select__drop-link"
									onClick={() => handleChange(opt)}
								>
									<span className="select__drop-text">{opt}</span>
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default THDropdown;
