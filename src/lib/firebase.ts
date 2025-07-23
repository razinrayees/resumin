import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBZNouuZC8MlX_6auSgsTXpao0z0_INnaY",
  authDomain: "resumin.link", // Changed from resume-bc7b1.firebaseapp.com
  projectId: "resume-bc7b1",
  storageBucket: "resume-bc7b1.firebasestorage.app",
  messagingSenderId: "361866536718",
  appId: "1:361866536718:web:1af5d1ce0448d4c2a8995f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);