import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





// 🔥 Firebase Config
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB21OWzYT4p_yHeqTLoQvWaKjZ3fC0cUtQ",
  authDomain: "study-platform-ff79d.firebaseapp.com",
  projectId: "study-platform-ff79d",
  storageBucket: "study-platform-ff79d.firebasestorage.app",
  messagingSenderId: "851039306955",
  appId: "1:851039306955:web:cf74aab1799bfdfd26074e",
  measurementId: "G-V6Q7057B40"
};

// Firebase config (replace with yours)







// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, doc, setDoc, getDoc, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };