import { initializeApp } from 'firebase/app';
import { getFirestore, } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWhOvCpUVKNoZdq5AR11ikGHfPjgdcbIo",
  authDomain: "clone-b9241.firebaseapp.com",
  projectId: "clone-b9241",
  storageBucket: "clone-b9241.appspot.com",
  messagingSenderId: "16078039526",
  appId: "1:16078039526:web:309261f2186f0e522c8e27"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
