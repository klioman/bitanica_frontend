import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocketToken } from 'redux/reducers/auth/selectors';
import { socketSendMessage } from 'redux/reducers/sockets/reducer';
import { getIsSocketsConnection } from 'redux/reducers/sockets/selectors';
import { ISocketWithPrivateTopicConnectWrapperProps } from './types';

// ================================================:
const SocketWithPrivateTopicConnectWrapper: FC<ISocketWithPrivateTopicConnectWrapperProps> = ({
	children,
	topicName,
}) => {
	const dispatch = useDispatch();
	const isSocketConnection = useSelector(getIsSocketsConnection);
	const socketToken = useSelector(getSocketToken);

	useEffect(() => {
		if (isSocketConnection && socketToken) {
			dispatch(socketSendMessage([5, topicName]));
		}
		return () => {
			if (isSocketConnection && socketToken) {
				dispatch(socketSendMessage([6, topicName]));
			}
		};
	}, [isSocketConnection, topicName, socketToken, dispatch]);

	return <>{children}</>;
};

export default SocketWithPrivateTopicConnectWrapper;
