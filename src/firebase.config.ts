import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBFpStuA9SbyEb5savVTKowpz25NPaNXDk',
	authDomain: 'house-shop-2450e.firebaseapp.com',
	projectId: 'house-shop-2450e',
	storageBucket: 'house-shop-2450e.appspot.com',
	messagingSenderId: '153489841184',
	appId: '1:153489841184:web:7e879494789fb566163045',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
