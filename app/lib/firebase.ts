// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore';


type firebaseConfigType = {
  [key:string]:string;
}

const firebaseConfig:firebaseConfigType = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_APP_ID,
  measurementId:import.meta.env.VITE_MEASUREMENT_ID,
};

const app:FirebaseApp = initializeApp(firebaseConfig);
const db:Firestore =  getFirestore(app);

export default db
