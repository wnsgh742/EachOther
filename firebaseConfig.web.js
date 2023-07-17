import { initializeApp  } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCpKu71oX_gFJw-Acr13EXGrz0_TwuTQwM",
    authDomain: "meet-b37f0.firebaseapp.com",
    projectId: "meet-b37f0",
    storageBucket: "meet-b37f0.appspot.com",
    messagingSenderId: "734081098087",
    appId: "1:734081098087:web:582906ba414c14e9ce8fc2",
    measurementId: "G-L874D7Z60T"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export default app;
const db = getFirestore(app);
