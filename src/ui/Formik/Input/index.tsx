/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import FormControl from 'ui/Formik/FormConrol';
import { IAdminInput } from './types';

// ==========================================:
const Input: FC<IAdminInput> = (props) => {
	const { ariaLabel, type, field, placeholder, inputMode, onKeyUp } = props;
	return (
		<FormControl ariaLabel={ariaLabel} {...props}>
			<input
				className="input-item"
				{...field}
				type={type}
				placeholder={placeholder}
				onKeyUp={onKeyUp}
				inputMode={inputMode || null}
			/>
		</FormControl>
	);
};

export default Input;
