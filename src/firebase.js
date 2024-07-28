// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBggVqqAbZelfZXSY6noOmivhD9pIBnPtk",
  authDomain: "crudwaifu.firebaseapp.com",
  projectId: "crudwaifu",
  storageBucket: "crudwaifu.appspot.com",
  messagingSenderId: "459833559881",
  appId: "1:459833559881:web:3e6fd131a15236d1d0e898",
  measurementId: "G-T54XCYX7VW"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };