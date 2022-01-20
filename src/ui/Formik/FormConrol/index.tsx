import { FC } from 'react';
import { IAdminFormConrol } from './types';

// ================================================:
const FormControl: FC<IAdminFormConrol> = (props) => {
	const { form, field, isShowPass, setIsShowPass, title, children, ariaLabel } = props;

	const errors: string = form?.errors?.[field?.name];
	const touched: string = form?.touched?.[field.name];

	const handlePassDisplay = (): void => {
		if (setIsShowPass) {
			setIsShowPass(!isShowPass);
		}
	};

	let inputStatus = '';

	if (errors && touched) {
		inputStatus = 'input--error';
	} else if (!errors && touched) {
		inputStatus = 'input--success';
	} else {
		inputStatus = '';
	}

	return (
		<div className={`input ${inputStatus}`}>
			<label htmlFor={title}>
				{title && <p className="input__name">{title}</p>}
				<div className={`input-wrapper ${errors && touched ? 'input--error' : ''}`}>
					{children}
					<span className="input-icon input-icon--more-right input-icon--success icon-Checkbox" />
					<span className="input-icon input-icon--more-right input-icon--error icon-close" />
					{setIsShowPass && (
						<button
							type="button"
							onClick={handlePassDisplay}
							aria-label={ariaLabel}
							className="show-pass"
						>
							<span className="password-type icon-eye" />
							<span className="text-type icon-eye2" />
						</button>
					)}
					{errors && touched && (
						<div className="input-notify">
							<span className="input-notify__char">*</span>
							<span className="input-notify__text">{errors && touched && errors}</span>
						</div>
					)}
				</div>
			</label>
		</div>
	);
};

export default FormControl;
