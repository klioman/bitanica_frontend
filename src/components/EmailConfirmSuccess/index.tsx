import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import { getEmailConfirm, getEmailConfirmIsLoad } from 'redux/reducers/auth/selectors';
import Loader from 'ui/Loader';
import CheckGreenIcon from 'assets/img/icons/check_green_icon.svg';

// ==========================================:
const EmailConfirmSuccess: FC = () => {
	const emailConfirmLoader = useSelector(getEmailConfirmIsLoad);
	const emailConfirm = useSelector(getEmailConfirm);

	return (
		<div className="additional">
			{emailConfirm ? (
				<>
					{emailConfirmLoader ? (
						<div className="additional__content">
							<img src={CheckGreenIcon} alt="check green icon" className="additional__icon" />
							<p className="additional__desc">
								{String(
									L.translate('EmailConfirm.EmailConfirmSuccess.email_confirm_success_title'),
								)}
							</p>
							<div className="additional__footer">
								<Link to="/login" className="button button--full-width">
									{String(
										L.translate('EmailConfirm.EmailConfirmSuccess.email_confirm_success_btn'),
									)}
								</Link>
							</div>
						</div>
					) : (
						<Loader />
					)}
				</>
			) : (
				<>
					{emailConfirmLoader ? (
						<Loader />
					) : (
						<div className="additional__content">
							<h3 className="additional__title">
								{String(L.translate('EmailConfirm.EmailConfirmSuccess.email_confirm_completed'))}
							</h3>
							<p className="additional__desc">
								{String(
									L.translate('EmailConfirm.EmailConfirmSuccess.email_confirm_completed_text'),
								)}
							</p>
							<div className="additional__footer">
								<Link to="/login" className="button button--full-width">
									{String(
										L.translate('EmailConfirm.EmailConfirmSuccess.email_confirm_success_btn'),
									)}
								</Link>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default EmailConfirmSuccess;
