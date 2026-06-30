import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTG2HwZv-k1WePgUlyHRBFN0tB9KIkoNA",
  authDomain: "alive-4b.firebaseapp.com",
  databaseURL: "https://alive-4b-default-rtdb.firebaseio.com",
  projectId: "alive-4b",
  storageBucket: "alive-4b.firebasestorage.app",
  messagingSenderId: "123935560007",
  appId: "1:123935560007:web:3b7eef41173465a791fc62",
  measurementId: "G-CRSND4N7E2"
}; // Actually used as an auth route, configured for public


const firebaseApp = initializeApp(firebaseConfig, "Auth");
const database = getDatabase(firebaseApp);

const auth = getAuth(firebaseApp);

export {database, ref, onValue, auth};