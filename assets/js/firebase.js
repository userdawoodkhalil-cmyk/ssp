import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB21OWzYT4p_yHeqTLoQvWaKjZ3fC0cUtQ",
  authDomain: "study-platform-ff79d.firebaseapp.com",
  projectId: "study-platform-ff79d",
  storageBucket: "study-platform-ff79d.firebasestorage.app",
  messagingSenderId: "851039306955",
  appId: "1:851039306955:web:cf74aab1799bfdfd26074e",
  measurementId: "G-V6Q7057B40"
};


// ✅ Initialize Firebase (ONLY ONCE)
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);


// 🔥 Google Provider
const provider = new GoogleAuthProvider();


// ✅ Google Login
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Google Login Success:", user);

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      },
      { merge: true }
    );

    window.location.replace("dashboard.html");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}


// ✅ EXPORTS
export {
  db,
  doc,
  setDoc,
  getDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithGoogle
};