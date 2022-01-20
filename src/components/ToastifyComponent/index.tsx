import { FC } from 'react';
import L from 'i18n-react';
import toastifyError from 'assets/img/icons/toastify_error.svg';
import toastifySuccess from 'assets/img/icons/toastify_success.svg';
import toastifyInfo from 'assets/img/icons/toastify_info.svg';
import { IToastifyComponent } from './types';

// ==========================================:
const ToastifyComponent: FC<IToastifyComponent> = ({ message, toastProps }) => {
	return (
		<div className="toastify-component">
			{toastProps?.type === 'error' && (
				<div className="toastify-component__icon toastify-component__icon--error">
					<img src={toastifyError} width="30" height="30" alt="" />
				</div>
			)}
			{toastProps?.type === 'success' && (
				<div className="toastify-component__icon toastify-component__icon--success">
					<img src={toastifySuccess} width="30" height="30" alt="" />
				</div>
			)}
			{toastProps?.type === 'info' && (
				<div className="toastify-component__icon toastify-component__icon--info">
					<img src={toastifyInfo} width="30" height="30" alt="" />
				</div>
			)}
			<div className="toastify-component__content">
				<h3 className="toastify-component__title">
					{toastProps?.type === 'error' && `${String(L.translate('Errors.error'))}`}
					{toastProps?.type === 'success' && `${String(L.translate('Errors.successful'))}`}
					{toastProps?.type === 'info' && `${String(L.translate('Errors.information'))}`}
				</h3>
				<p className="toastify-component__text">{message}</p>
			</div>
		</div>
	);
};

export default ToastifyComponent;
