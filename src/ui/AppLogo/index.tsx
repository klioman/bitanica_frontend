import { FC } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import logo from 'assets/img/logo.png';

// ================================================:
const AppLogo: FC = () => {
	const location = useLocation();

	if (location.pathname === '/') {
		return (
			<span className="logo">
				<span className="logo__img">
					<img src={logo} alt="Logo" width="41" height="24" />
				</span>
				<span className="logo__text">Bitanica</span>
			</span>
		);
	}

	return (
		<Link to="/" className="logo">
			<span className="logo__img">
				<img src={logo} alt="Logo" width="41" height="24" />
			</span>
			<span className="logo__text">Bitanica</span>
		</Link>
	);
};

export default AppLogo;
