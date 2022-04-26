import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
// import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Explore />} />
					<Route path="/offers" element={<Offers />} />
					<Route path="/profile" element={<Signin />} />
					<Route path="/sign-in" element={<Signin />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Routes>
				<Navbar />
			</Router>
		</>
	);
}

export default App;
