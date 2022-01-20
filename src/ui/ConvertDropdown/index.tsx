import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
import { IWalletItem } from 'redux/reducers/wallets/types';
import { IConvertDropdownProps } from './types';

// ================================================:
const ConvertDropdown: FC<IConvertDropdownProps> = (props) => {
	const { value, options, onChange } = props;

	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	const node = useRef<HTMLDivElement | null>(null);

	const handleClick = (event: MouseEvent): boolean | undefined => {
		if (node?.current?.contains(event.target as Node)) {
			return false;
		}

		setOpen(false);
		setSearch('');

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
		setSearch('');
	};

	const handleSelectToggle = (): void => {
		setOpen(!open);
		setSearch('');
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;

		setSearch(target.value);
	};

	const filteredOptionsBySearch = useMemo(
		() =>
			options?.filter((option) =>
				option?.asset?.code?.toLowerCase().includes(search?.toLowerCase()?.trim()),
			),
		[options, search],
	);

	return (
		<div className={`select enter-value__select ${open ? 'active' : ''}`} ref={node}>
			<button className="select__current" type="button" onClick={handleSelectToggle}>
				<div className="select__icon">
					<img src={value?.asset?.img_path} width="24" height="24" alt="" />
				</div>
				{value?.asset?.code?.toUpperCase()}
				<span className="select__arrow icon-arrow2" />
			</button>
			{open && options && (
				<div className="select__drop">
					<div className="select__drop-wrap">
						<div className="search search--big">
							<div className="input">
								<div className="input-wrapper">
									<input
										className="input-item input-item--small-height input-item--right-icon"
										type="text"
										placeholder="Enter token name"
										value={search}
										onChange={handleSearch}
									/>
									<button className="search-btn" type="button">
										<span className="search-btn__icon icon-search-normal" />
									</button>
								</div>
							</div>
						</div>
						{filteredOptionsBySearch?.length ? (
							filteredOptionsBySearch?.map((opt: IWalletItem) => (
								<div className="select__drop-item" key={opt?.id}>
									<button
										type="button"
										className="select__drop-link"
										onClick={() => handleChange(opt)}
									>
										<span className="select__drop-icon">
											<img src={opt?.asset?.img_path} alt="" />
										</span>
										<span className="select__drop-text">{opt?.asset?.code?.toUpperCase()}</span>
										{value?.asset?.code?.toUpperCase() === opt?.asset?.code?.toUpperCase() && (
											<div className="select-check">
												<span className="select-check__icon icon-Checkbox" />
											</div>
										)}
									</button>
								</div>
							))
						) : (
							<span>No results found.</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ConvertDropdown;
