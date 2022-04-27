import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

interface IUserSignUp {
	email: string;
	name: string;
	password: string;
}

const SignUp = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState<IUserSignUp>({ email: '', password: '', name: '' });
	const { email, password, name } = formData;

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
						type="text"
						className="nameInput"
						placeholder="Name"
						id="name"
						onChange={inputHandler}
					/>

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

					<div className="signUpBar">
						<p className="signUpText">Sign Up</p>
						<button className="signUpButton">
							<ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
						</button>
					</div>
				</form>
				{/* Google OAth */}

				<Link to="/sign-in" className="registerLink">
					Sign In Instead
				</Link>
			</div>
		</>
	);
};

export default SignUp;
