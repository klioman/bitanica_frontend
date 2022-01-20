import { FC } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// ================================================:
const AppFooterLogo: FC = () => {
	const location = useLocation();

	if (location.pathname === '/') {
		return (
			<span className="logo">
				<span className="logo__text">Bitanica</span>
			</span>
		);
	}

	return (
		<Link to="/" className="logo">
			<span className="logo__text">Bitanica</span>
		</Link>
	);
};

export default AppFooterLogo;
