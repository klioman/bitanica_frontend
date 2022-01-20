import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import {
	emailResetConfirmTokenRequest,
	emailConfirmStatusCallback,
} from 'redux/reducers/auth/reducer';
import { getEmailConfirm, getEmailResetConfirmTokenStatus } from 'redux/reducers/auth/selectors';
import CheckGreenIcon from 'assets/img/icons/check_green_icon.svg';

// ==========================================:
const EmailConfirmError: FC = () => {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const emailConfirm = useSelector(getEmailConfirm);
	const emailConfirmStatus = useSelector(getEmailResetConfirmTokenStatus);

	const queryPar = queryString.parse(location.search);

	const handleResetEmailConfirm = () => {
		dispatch(emailResetConfirmTokenRequest({ token: queryPar.token, history }));
	};

	useEffect(() => {
		dispatch(emailConfirmStatusCallback());
	}, [dispatch]);

	return (
		<div className="additional">
			{emailConfirm ? (
				<div className="additional__content">
					<img src={CheckGreenIcon} alt="check green icon" className="additional__icon" />
					<p className="additional__desc">
						{String(L.translate('EmailConfirm.EmailConfirmError.email_confirm_error_title'))}
					</p>
					<div className="additional__footer">
						<Link to="/login" className="button button--full-width">
							{String(L.translate('EmailConfirm.EmailConfirmError.email_confirm_error_button'))}
						</Link>
					</div>
				</div>
			) : (
				<>
					{emailConfirmStatus ? (
						<div className="additional__content">
							<img src={CheckGreenIcon} alt="check green icon" className="additional__icon" />
							<p className="additional__desc">
								{String(
									L.translate('EmailConfirm.EmailConfirmError.email_confirm_error_send_title'),
								)}
							</p>
						</div>
					) : (
						<div className="additional__content">
							<h3 className="additional__title">
								{String(
									L.translate('EmailConfirm.EmailConfirmError.email_confirm_error_exp_title'),
								)}
							</h3>
							<p className="additional__desc">
								{String(L.translate('EmailConfirm.EmailConfirmError.email_confirm_error_exp'))}
							</p>
							<div className="additional__footer">
								<button
									type="button"
									onClick={handleResetEmailConfirm}
									className="button button--full-width button--red"
								>
									{String(
										L.translate('EmailConfirm.EmailConfirmError.email_confirm_error_send_btn'),
									)}
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default EmailConfirmError;
