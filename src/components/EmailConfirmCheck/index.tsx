import { FC } from 'react';
import CheckGreenIcon from 'assets/img/icons/check_green_icon.svg';

// ==========================================:
const EmailConfirmCheck: FC = () => {
	return (
		<div className="additional">
			<div className="additional__content">
				<img src={CheckGreenIcon} alt="check green icon" className="additional__icon" />
				<h3 className="additional__title email-confirm-check">Confirmation email was sent</h3>
				<p className="additional__desc">
					We have sent a confirmation email one more time. Please check your mail
				</p>
			</div>
		</div>
	);
};

export default EmailConfirmCheck;
