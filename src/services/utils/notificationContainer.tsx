import { toast } from 'react-toastify';
import ToastifyComponent from 'components/ToastifyComponent';
import { toastifyConfig } from './toastifyConfig';

// ==========================================:
export const notificationContainer = (message: string, type: string): void => {
	switch (type) {
		case 'success':
			toast.success(<ToastifyComponent message={message} />, toastifyConfig);
			break;
		case 'error':
			toast.error(<ToastifyComponent message={message} />, toastifyConfig);
			break;
		case 'info':
			toast.info(<ToastifyComponent message={message} />, toastifyConfig);
			break;

		default:
			break;
	}
};
