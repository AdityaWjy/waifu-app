// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBggVqqAbZelfZXSY6noOmivhD9pIBnPtk",
    authDomain: "crudwaifu.firebaseapp.com",
    projectId: "crudwaifu",
    storageBucket: "crudwaifu.appspot.com",
    messagingSenderId: "459833559881",
    appId: "1:459833559881:web:4b00ba6e2cfdef6bd0e898",
    measurementId: "G-4PYF04Y9SM"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { db, storage };