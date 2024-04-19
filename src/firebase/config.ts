// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAT8ZlFcNbUMrISUQAdmmNaa6BPBWxhhJQ',
	authDomain: 'book-store-2e2c8.firebaseapp.com',
	projectId: 'book-store-2e2c8',
	storageBucket: 'book-store-2e2c8.appspot.com',
	messagingSenderId: '844543119485',
	appId: '1:844543119485:web:7e40ca94a328ec41446114',
	measurementId: 'G-N96D3RQLEB',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { auth, db };
