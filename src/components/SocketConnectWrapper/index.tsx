import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocketToken } from 'redux/reducers/auth/selectors';
import { socketClosedConnection, socketOpenConnection } from 'redux/reducers/sockets/reducer';
import { ISocketConnectWrapperProps } from './types';

// ================================================:
const SocketConnectWrapper: FC<ISocketConnectWrapperProps> = ({ children }) => {
	const dispatch = useDispatch();
	const socketToken = useSelector(getSocketToken);

	useEffect(() => {
		if (socketToken) {
			dispatch(socketOpenConnection(socketToken));
		} else {
			dispatch(socketOpenConnection(null));
		}

		return () => {
			dispatch(socketClosedConnection());
		};
	}, [socketToken, dispatch]);

	return <>{children}</>;
};

export default SocketConnectWrapper;
