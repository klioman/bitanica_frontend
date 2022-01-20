import { FC } from 'react';
import { ITextError } from './types';

// ================================================:
const TextError: FC<ITextError> = ({ children }) => {
	return (
		<div className="input-notify">
			<span className="input-notify__char">*</span>
			<span className="input-notify__text">{children}</span>
		</div>
	);
};

export default TextError;
