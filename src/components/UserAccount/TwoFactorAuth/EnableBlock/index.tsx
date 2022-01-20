import { FC } from 'react';
import { useSelector } from 'react-redux';
import { get2faData } from 'redux/reducers/settings/selectors';
import Google2faSteps from 'components/UserAccount/TwoFactorAuth/Google2faSteps';
import EnableInfo from 'components/UserAccount/TwoFactorAuth/EnableInfo';

// ==========================================:
const EnableBlock: FC = () => {
	const google2faData = useSelector(get2faData);

	return <>{google2faData ? <Google2faSteps data={google2faData} /> : <EnableInfo />}</>;
};

export default EnableBlock;
