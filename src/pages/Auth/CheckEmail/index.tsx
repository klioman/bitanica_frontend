import { FC } from 'react';
import Auth from 'layouts/Auth';
import EmailConfirmCheck from 'components/EmailConfirmCheck';

// ==========================================:
const CheckEmail: FC = () => {
	return (
		<Auth title="Check email">
			<EmailConfirmCheck />
		</Auth>
	);
};

export default CheckEmail;
