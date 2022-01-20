import { FC } from 'react';
import UserTradesTable from '../UserTradesTable';
import { IUserTradesProps } from './types';

const UserTrades: FC<IUserTradesProps> = ({ data }) => {
	return data?.length ? <UserTradesTable data={data} /> : <div>No data</div>;
};

export default UserTrades;
