
import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth"
import {  getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD-udDhsTduaaBEUyj0MBqICQZalZ1bm2A",
  authDomain: "assignment-59f96.firebaseapp.com",
  projectId: "assignment-59f96",
  storageBucket: "assignment-59f96.appspot.com",
  messagingSenderId: "846566544043",
  appId: "1:846566544043:web:9d134a0ef498bb26119dee",
  measurementId: "G-X37C0EHNQX"
};
const app = initializeApp(firebaseConfig)
export const db=getFirestore(app)
export const auth = getAuth(app);

// console.log(db)