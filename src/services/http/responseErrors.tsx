import { AxiosError } from 'axios';
import L from 'i18n-react';
import { notificationContainer } from 'services/utils/notificationContainer';

// ==========================================:
const responseErrors = (error: AxiosError) => {
	const { response } = error;

	if (!response) {
		notificationContainer(String(L.translate(`Errors.server_error`)), 'error');
	}

	if (response) {
		const { status, data } = response;
		const errorList: Array<string> = [];

		if (data?.message) {
			errorList.push(data?.message);
		} else {
			Object.keys(data?.errors).forEach((item) =>
				errorList.push(data?.errors[item as keyof typeof data.errors]),
			);
		}

		const errorMessage = String(L.translate(`Errors.${errorList.flat()[0]}`));

		switch (status) {
			case 400: // Bad request
				notificationContainer(errorMessage, 'error');
				break;

			// case 403: // Form validation
			// 	notificationContainer(errorMessage, 'error');
			// 	break;

			case 404: // Not found
				notificationContainer(errorMessage, 'error');
				break;

			case 422: // Form validation
				notificationContainer(errorMessage, 'error');
				break;

			case 429: // Too Many Attempts
				notificationContainer(String(L.translate(`Errors.too_many_requests`)), 'error');
				break;

			case 500: // Internal Server Error
				notificationContainer(String(L.translate(`Errors.server_error`)), 'error');
				break;

			default:
				break;
		}
	}
};

export { responseErrors };
