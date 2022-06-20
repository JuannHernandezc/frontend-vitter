import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQToiFowJtYpikU6SLnBDr9BTLGpjJX6g",
  authDomain: "vitterapp.firebaseapp.com",
  projectId: "vitterapp",
  storageBucket: "vitterapp.appspot.com",
  messagingSenderId: "503482905829",
  appId: "1:503482905829:web:5cc6565d5ce2113f86100c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};