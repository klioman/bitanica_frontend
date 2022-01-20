import { FC, useEffect, useRef, useState } from 'react';
import L from 'i18n-react';
import { IHeaderDropdownList } from 'layouts-elements/Header/AuthHeader/types';
import { IHeaderDropdown } from './types';

// ==================================:
const HeaderDropdown: FC<IHeaderDropdown> = (props) => {
	const {
		value,
		options,
		placeholderIcon,
		placeholder = `${String(L.translate('Menu.Select'))}`,
		onChange,
	} = props;

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

	const handleChange = (selectedValue: IHeaderDropdownList): void => {
		onChange(selectedValue);
		setOpen(false);
	};

	const handleSelectToggel = (): void => {
		setOpen(!open);
	};

	return (
		<div className={`select header__select ${open ? 'active' : ''}`} ref={node}>
			<button type="button" className="select__current" onClick={handleSelectToggel}>
				<span
					className={`select__icon ${
						placeholderIcon && placeholderIcon !== undefined ? placeholderIcon : ''
					}`}
				/>
				{value || <span>{placeholder}</span>}
				<span className="select__arrow icon-arrow2" />
			</button>
			{open && (
				<div className="select__drop">
					<div className="select__drop-scroll">
						{options.map((opt: IHeaderDropdownList) => {
							return (
								<div className="select__drop-item" key={opt?.order}>
									<button
										type="button"
										className="select__drop-link"
										onClick={() => handleChange(opt)}
									>
										<span className={`select__drop-icon ${opt?.icon}`} />
										<span className="select__drop-text">{opt?.name}</span>
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

export default HeaderDropdown;
