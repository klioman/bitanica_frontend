import { FC } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'components/Chart';
import SocketWithTopicConnectWrapper from 'components/SocketWithTopicConnectWrapper';
import { getCurrentPair } from 'redux/reducers/tradingSettings/selectors';

// ================================================:
const TradingChart: FC = () => {
	const currentPair = useSelector(getCurrentPair);

	return (
		<SocketWithTopicConnectWrapper topicName={`trades:${String(currentPair || 'btc_usdt')}`}>
			<div className="chart-wrapper">
				<Chart />
			</div>
		</SocketWithTopicConnectWrapper>
	);
};

export default TradingChart;
