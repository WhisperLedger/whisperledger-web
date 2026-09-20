import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyWPFvO_MDqJbRdMjIv0WUJP4wO93dFnA",
  authDomain: "whisperledger-94715.firebaseapp.com",
  projectId: "whisperledger-94715",
  storageBucket: "whisperledger-94715.firebasestorage.app",
  messagingSenderId: "1064792050841",
  appId: "1:1064792050841:web:9e30d27d9f6aa2e4fe3c08"
};

// Singleton App initialization
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// STRICT AUTHORIZED SINGLE ROOT ADMINISTRATOR ALLOWLIST
export const AUTHORIZED_ROOT_ADMIN_EMAILS = [
  "agarwaltanmay401@gmail.com",
  "agawaltanmay401@gamil.com",
  "agawaltanmay401@gmail.com",
  "agarwal.tanmay401@gmail.com"
];

export function isAuthorizedAdmin(email?: string | null): boolean {
  if (!email) return false;
  return AUTHORIZED_ROOT_ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
