import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getDisplayDisableBlock } from 'redux/reducers/settings/selectors';
import DisableBlock from '../DisableBlock';
import EnableBlock from '../EnableBlock';

// ==========================================:
const Google2faActions: FC = () => {
	const displayDisableBlock = useSelector(getDisplayDisableBlock);

	return displayDisableBlock === '2fa_enabled' ? <DisableBlock /> : <EnableBlock />;
};

export default Google2faActions;
