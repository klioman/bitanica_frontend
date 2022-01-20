import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { isAfter } from 'date-fns';
import { emailConfirmRequest } from 'redux/reducers/auth/reducer';
import Auth from 'layouts/Auth';
import EmailConfirmSuccess from 'components/EmailConfirmSuccess';
import EmailConfirmError from 'components/EmailConfirmError';

// ==========================================:
const EmailConfirm: FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const queryPar = queryString.parse(location.search);
	const tokenTime = new Date(Number(queryPar.timestamp) * 1000);
	const currentTime = new Date();

	const tokenTimeExpired = isAfter(currentTime, tokenTime);

	useEffect(() => {
		if (!tokenTimeExpired) {
			dispatch(emailConfirmRequest({ token: queryPar.token, timestamp: queryPar.timestamp }));
		}
	}, [dispatch, queryPar.timestamp, queryPar.token, tokenTimeExpired]);

	return (
		<Auth title="Email confirm">
			{tokenTimeExpired ? <EmailConfirmError /> : <EmailConfirmSuccess />}
		</Auth>
	);
};

export default EmailConfirm;
