import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

interface IUserSignUp {
	email: string;
	name: string;
	password: string;
	timestamp?: FieldValue;
}

const SignUp = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState<
		Partial<Pick<IUserSignUp, 'password'>> & Omit<IUserSignUp, 'password'>
	>({ email: '', password: '', name: '' });
	const { email, password, name } = formData;

	const navigate = useNavigate();

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({ ...prevState, [event.target.id]: event.target.value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const auth = getAuth();

			const userCredential = await createUserWithEmailAndPassword(auth, email, password ?? '');

			const user = userCredential.user;

			if (auth.currentUser) {
				const user: User = auth.currentUser;

				updateProfile(user, { displayName: name });
			}

			const formDataCopy = { ...formData };
			delete formDataCopy.password;

			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);

			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<form onSubmit={handleSubmit}>
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
