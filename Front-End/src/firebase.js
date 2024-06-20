// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5l5Tsqk5OLWCm3655Eyg7rYfJKYX5YfI",
  authDomain: "otp-app-536ff.firebaseapp.com",
  projectId: "otp-app-536ff",
  storageBucket: "otp-app-536ff.appspot.com",
  messagingSenderId: "610677415040",
  appId: "1:610677415040:web:033aa5324330bf7f291a65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;