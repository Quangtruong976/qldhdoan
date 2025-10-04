// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTREupF15kGJqzh7iWqvzPwtRLTeO-E4g",
  authDomain: "qldhdoan-web.firebaseapp.com",
  projectId: "qldhdoan-web",
  storageBucket: "qldhdoan-web.appspot.com",
  messagingSenderId: "92717411505",
  appId: "1:92717411505:web:1dcb5d0e1c79fdb39a730b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
