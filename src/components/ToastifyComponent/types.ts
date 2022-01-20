import { ToastOptions } from 'react-toastify';

// ==========================================:
export interface IToastifyComponent {
	message: string;
	toastProps?: ToastOptions;
}
