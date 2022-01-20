import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { generate2faKeyRequest } from 'redux/reducers/settings/reducer';
import { get2faIsLoad } from 'redux/reducers/settings/selectors';
import Loader from 'ui/Loader';

// ==========================================:
const EnableInfo: FC = () => {
	const dispatch = useDispatch();
	const account2faIsLoad = useSelector(get2faIsLoad);

	const handleGenerate2faKey = () => {
		dispatch(generate2faKeyRequest());
	};

	return (
		<div className="content-block content-block--medium">
			<div className="content-block__header">
				<div className="content-block__title">
					<span className="content-block__title-icon icon-scan" />
					<span className="content-block__title-text">
						{String(L.translate('Account.TwoFactorAuth.two_factor_auth_enable_title'))}
					</span>
				</div>
			</div>
			<div className="content-block__main">
				<p className="content-block__desc">
					{String(L.translate('Account.TwoFactorAuth.two_factor_auth_enable_text'))}
				</p>
			</div>
			<div className="content-block__footer">
				<button
					onClick={handleGenerate2faKey}
					type="button"
					disabled={account2faIsLoad}
					className="button button--full-width btn-2fa"
				>
					{account2faIsLoad ? (
						<>
							<Loader small />
							<span className="btn-2fa-loading-text">
								{String(L.translate('Account.TwoFactorAuth.two_factor_auth_loading'))}
							</span>
						</>
					) : (
						String(L.translate('Account.TwoFactorAuth.two_factor_auth_enable_btn'))
					)}
				</button>
			</div>
		</div>
	);
};

export default EnableInfo;
