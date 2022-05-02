import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const auth = getAuth();
	const [formData, setFormData] = useState({
		name: auth.currentUser?.displayName,
		email: auth.currentUser?.email,
	});

	const navigate = useNavigate();

	const handleLogout = () => {
		auth.signOut();
		navigate('/');
	};

	return (
		<div className="profile">
			<header className="profileHeader">My Profile</header>
			<button className="logOut" type="button" onClick={handleLogout}>
				logout
			</button>
		</div>
	);
};

export default Profile;
