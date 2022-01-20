import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketSendMessage } from 'redux/reducers/sockets/reducer';
import { getIsSocketsConnection } from 'redux/reducers/sockets/selectors';
import { ISocketWithTopicConnectWrapperProps } from './types';

// ================================================:
const SocketWithTopicConnectWrapper: FC<ISocketWithTopicConnectWrapperProps> = ({
	children,
	topicName,
}) => {
	const dispatch = useDispatch();
	const isSocketConnection = useSelector(getIsSocketsConnection);

	useEffect(() => {
		if (isSocketConnection) {
			dispatch(socketSendMessage([5, topicName]));
		}
		return () => {
			if (isSocketConnection) {
				dispatch(socketSendMessage([6, topicName]));
			}
		};
	}, [isSocketConnection, topicName, dispatch]);

	return <>{children}</>;
};

export default SocketWithTopicConnectWrapper;
