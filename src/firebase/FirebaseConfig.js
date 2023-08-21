import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGDrKY_1Ui7h9PsPkplIOz-0wLxzIMlVM",
  authDomain: "simple-chat-app-4f456.firebaseapp.com",
  databaseURL: "https://simple-chat-app-4f456-default-rtdb.firebaseio.com",
  projectId: "simple-chat-app-4f456",
  storageBucket: "simple-chat-app-4f456.appspot.com",
  messagingSenderId: "423007241819",
  appId: "1:423007241819:web:f50c849a794fd79d8a217e"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const database=getFirestore(app);