import { getAuth, updateProfile, UserInfo } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProfile {
	name: UserInfo['displayName'];
	email: UserInfo['email'];
}

const Profile = () => {
	const auth = getAuth();

	const [changeDetails, setChangeDetails] = useState<boolean>(false);

	const [formData, setFormData] = useState<IProfile>({
		name: auth.currentUser ? auth.currentUser.displayName : '',
		email: auth.currentUser ? auth.currentUser.email : '',
	});

	const { name, email } = formData;

	const navigate = useNavigate();

	const handleLogout = () => {
		auth.signOut();
		navigate('/');
	};

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({ ...prevState, [event.target.id]: event.target.value }));
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser?.displayName !== name) {
				if (auth.currentUser) {
					await updateProfile(auth.currentUser, { displayName: name });
					const userRef = doc(db, 'users', auth.currentUser.uid);
					await updateDoc(userRef, { name });
				}
			}
		} catch (err) {
			toast.error('Could not update profile details');
		}
	};

	return (
		<div className="profile">
			<header className="profileHeader">My Profile</header>
			<main>
				<div className="profileDetailsHeader">
					<p className="personalDetailsText">Personal Details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className="profileCard">
					<form>
						<input
							type="text"
							id="name"
							className={!changeDetails ? 'profileName' : 'profileNameActive'}
							disabled={!changeDetails}
							value={name ?? ''}
							onChange={inputHandler}
						/>

						<input
							type="email"
							id="email"
							className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
							disabled={!changeDetails}
							value={email ?? ''}
							onChange={inputHandler}
						/>
					</form>
				</div>
			</main>
			<button className="logOut" type="button" onClick={handleLogout}>
				logout
			</button>
		</div>
	);
};

export default Profile;
