import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

//
export const AuthComponent = StyledFirebaseAuth.default
  ? StyledFirebaseAuth.default
  : StyledFirebaseAuth;

// VITE_FIREBASE_API_KEY
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "peer-to-peering.firebaseapp.com",
  projectId: "peer-to-peering",
  storageBucket: "peer-to-peering.appspot.com",
  messagingSenderId: "308858443055",
  appId: "1:308858443055:web:5a670a54e2cfa985567dda",
  measurementId: "G-5VDDR1HDEK",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};
