import { initializeApp } from 'firebase/app';
import { getFirestore, } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Ms6PoCeS572Bwm-JGIAJeWZjWVtpJ5w",
  authDomain: "clone-7e710.firebaseapp.com",
  projectId: "clone-7e710",
  storageBucket: "clone-7e710.appspot.com",
  messagingSenderId: "859441695901",
  appId: "1:859441695901:web:c3b23cde0b9291d7a59874"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
