import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAOhiBYZqnv2XHGKoXgQuBl9Gq4lgLtw9M',
	authDomain: 'goal-trackr-71cd3.firebaseapp.com',
	projectId: 'goal-trackr-71cd3',
	storageBucket: 'goal-trackr-71cd3.appspot.com',
	messagingSenderId: '237192199010',
	appId: '1:237192199010:web:c6fbe99ee6f76d86070a3b',
	measurementId: 'G-12033MG19D',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db, auth, storage, provider };
