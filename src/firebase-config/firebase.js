import { initializeApp } from "firebase/app";
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5JCM5oTfft0iks6Ub48Um6GDJYrgqerg",
  authDomain: "cinema-website-b44c3.firebaseapp.com",
  databaseURL:
    "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cinema-website-b44c3",
  storageBucket: "cinema-website-b44c3.appspot.com",
  messagingSenderId: "270521838079",
  appId: "1:270521838079:web:28e1b37d5a2268c3d79fca",
  measurementId: "G-GJGE701ZBQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signOut };
