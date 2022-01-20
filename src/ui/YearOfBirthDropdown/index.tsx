import { FC, useEffect, useRef, useState } from 'react';
import { dataFromRange } from 'services/utils/dataFromRange';
import successIcon from 'assets/img/icons/success-icon.svg';
import { IYearOfBirthDropdownProps } from './types';

// ==================================:
const YearOfBirthDropdown: FC<IYearOfBirthDropdownProps> = (props) => {
	const { value, placeholder = 'Year of Birth', onChange } = props;

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

	const handleChange = (selectedValue: number): void => {
		onChange(selectedValue);
		setOpen(false);
	};

	const handleSelectToggel = (): void => {
		setOpen(!open);
	};

	return (
		<div className={`select select--regular ${open ? 'active' : ''}`} ref={node}>
			<button type="button" className="select__current" onClick={handleSelectToggel}>
				{value ? <>{value}</> : <span className="select__current-currency">{placeholder}</span>}
				<span className="select__arrow icon-arrow2" />
			</button>

			{open && (
				<div className="select__drop">
					<div className="select__drop-scroll">
						{dataFromRange(1922, new Date().getFullYear() - 16)?.map((opt: number) => (
							<div className="select__drop-item" key={opt}>
								<button
									type="button"
									className="select__drop-link"
									onClick={() => handleChange(opt)}
								>
									<div className="select-succcess-wrapper">
										<p className="select__drop-text">{opt}</p>
										{value === opt && <img src={successIcon} alt="" />}
									</div>
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default YearOfBirthDropdown;
