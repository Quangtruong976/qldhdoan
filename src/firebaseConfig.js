import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTREupF15kGJqzh7iWqvzPwtRLTeO-E4g",
  authDomain: "qldhdoan-web.firebaseapp.com",
  projectId: "qldhdoan-web",
  storageBucket: "qldhdoan-web.appspot.com",
  messagingSenderId: "65480069673",
  appId: "1:65480069673:web:784edd44ae6524fdf58238"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
