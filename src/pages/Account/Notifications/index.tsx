import { FC } from 'react';
import Account from 'layouts/Account';
import UserNotifications from 'components/UserAccount/UserNotifications';

// ==========================================:
const Notifications: FC = () => {
	return (
		<Account title="Notifications">
			<UserNotifications />
		</Account>
	);
};

export default Notifications;
