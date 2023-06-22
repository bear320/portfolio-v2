import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'my-portfolio-8932b.firebaseapp.com',
  projectId: 'my-portfolio-8932b',
  storageBucket: 'my-portfolio-8932b.appspot.com',
  messagingSenderId: '603132306790',
  appId: '1:603132306790:web:d3e9181bceee41935654a7',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, db };
