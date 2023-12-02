// Confiq.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyByTuK4ArJ5krUv7qsfGkIrOYRiyBXGUE0",
  authDomain: "react-app-d4402.firebaseapp.com",
  projectId: "react-app-d4402",
  storageBucket: "react-app-d4402.appspot.com",
  messagingSenderId: "93562085135",
  appId: "1:93562085135:web:4ee916b3092dd2b4a1687a",
  measurementId: "G-0RLHSDWREB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export { auth, googleProvider, githubProvider, facebookProvider };
