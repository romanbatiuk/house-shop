import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = (): JSX.Element => {
	const [email, setEmail] = useState<string>('');

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

	const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was send.');
		} catch (err) {
			console.log(err);
			toast.error('Could not send reset email');
		}
	};

	return (
		<div className="pageContainer">
			<header className="pageHeader">
				<p>Forgot Password</p>
			</header>
			<main>
				<form onSubmit={onSubmitHandler}>
					<input
						type="text"
						className="emailInput"
						placeholder="Email"
						id="email"
						value={email}
						onChange={onChangeHandler}
					/>
					<Link className="forgotPasswordLink" to="/sign-in">
						Sign In
					</Link>
					<div className="signInBar">
						<div className="signInText">Send Reset Link</div>
						<button className="signInButton">
							<ArrowRightIcon fill="#fff" width="34px" height="34px" />
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;
