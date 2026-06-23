import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-IENm6Kq5ljimiOk4DN4CZKU3tbuvw8c",
  authDomain: "velocity-63a00.firebaseapp.com",
  projectId: "velocity-63a00",
  storageBucket: "velocity-63a00.firebasestorage.app",
  messagingSenderId: "606845159995",
  appId: "1:606845159995:web:3a677f854807ad0819aa1e",
  measurementId: "G-VRNQ3RKJYE",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
