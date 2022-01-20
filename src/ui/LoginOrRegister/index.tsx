import { FC } from 'react';
import { Link } from 'react-router-dom';

const LoginOrRegister: FC = () => {
	return (
		<div className="login-register-wrapper">
			<Link to="/login" className="link login-register-link">
				Log In
			</Link>
			<p> or </p>
			<Link to="/registration" className="link login-register-link">
				{' '}
				Register Now
			</Link>
			<p> to trade</p>
		</div>
	);
};

export default LoginOrRegister;
