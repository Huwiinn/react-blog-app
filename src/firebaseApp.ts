// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTHDOMAIN,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_APPID,
  measurementId: process.env.REACT_APP_API_MEASURE_MENT_ID,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export default firebase;
