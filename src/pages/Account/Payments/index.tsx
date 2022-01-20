import { FC } from 'react';
import Account from 'layouts/Account';
import UserPayment from 'components/UserAccount/UserPayment';

// ==========================================:
const Payments: FC = () => {
	return (
		<Account title="Payments">
			<UserPayment />
		</Account>
	);
};

export default Payments;
