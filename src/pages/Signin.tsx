import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

interface IUserSignIn {
	email: string;
	password: string;
}

const SignIn = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState<IUserSignIn>({ email: '', password: '' });

	const { email, password } = formData;
	const navigate = useNavigate();

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({ ...prevState, [event.target.id]: event.target.value }));
	};

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<form>
					<input
						type="email"
						className="emailInput"
						placeholder="Email"
						id="email"
						onChange={inputHandler}
					/>
					<div className="passwordInputDiv">
						<input
							type={showPassword ? 'text' : 'password'}
							className="passwordInput"
							placeholder="Password"
							id="password"
							onChange={inputHandler}
						/>
						<img
							src={visibilityIcon}
							className="showPassword"
							alt="Show password"
							onClick={() => setShowPassword((prevState) => !prevState)}
						/>
					</div>
					<Link to="/forgot-password" className="forgotPasswordLink">
						Forgot Password
					</Link>

					<div className="signInBar">
						<p className="signInText">Sign In</p>
						<button className="signInButton">
							<ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
						</button>
					</div>
				</form>
				{/* Google OAth */}

				<Link to="/sign-up" className="registerLink">
					Sign Up Instead
				</Link>
			</div>
		</>
	);
};

export default SignIn;
