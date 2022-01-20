import { FC } from 'react';
import { Link } from 'react-router-dom';

// ==========================================:
const BitanicaInfo: FC = () => {
	return (
		<div className="section">
			<div className="container">
				<div className="register-block wow animate__animated animate__zoomIn">
					<span className="register-block__name">Bitanica</span>
					<span className="register-block__desc">
						Become part of a global community of people who have found their path to the crypto
						world with Georgia
					</span>
					<div className="register-block__footer">
						<Link to="/registration" className="button button--shadow-type">
							Register now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BitanicaInfo;
