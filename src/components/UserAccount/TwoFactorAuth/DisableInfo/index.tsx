import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { displayDisableForm } from 'redux/reducers/settings/reducer';
import { get2faIsLoad } from 'redux/reducers/settings/selectors';
import Loader from 'ui/Loader';

// ==========================================:
const DisableInfo: FC = () => {
	const dispatch = useDispatch();
	const account2faIsLoad = useSelector(get2faIsLoad);

	const handleDisable2fa = () => {
		dispatch(displayDisableForm(true));
	};

	return (
		<div className="content-block content-block--medium">
			<div className="content-block__header">
				<div className="content-block__title">
					<span className="content-block__title-icon icon-scan" />
					<span className="content-block__title-text">
						{String(L.translate('Account.TwoFactorAuth.two_factor_auth_disable_title'))}
					</span>
				</div>
			</div>
			<div className="content-block__main">
				<p className="content-block__desc">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus interdum tellus et
					sodales. Mauris sapien eros, consequat vitae tempus eget, suscipit eget est. Proin
					accumsan justo nec turpis mollis, quis blandit velit ultrices.
				</p>
			</div>
			<div className="content-block__footer">
				<button
					onClick={handleDisable2fa}
					type="button"
					className="button button--full-width btn-2fa btn-2fa--disable"
				>
					{account2faIsLoad ? (
						<>
							<Loader small />
							<span className="btn-2fa-loading-text">
								{String(L.translate('Account.TwoFactorAuth.two_factor_auth_loading'))}
							</span>
						</>
					) : (
						String(L.translate('Account.TwoFactorAuth.two_factor_auth_disable_btn'))
					)}
				</button>
			</div>
		</div>
	);
};

export default DisableInfo;
