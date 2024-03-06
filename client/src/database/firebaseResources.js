// Import necessary Firebase and FirebaseUI modules for app initialization, authentication, and Firestore database management.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Resolve potential export discrepancies in the StyledFirebaseAuth module, ensuring compatibility.
export const AuthComponent = StyledFirebaseAuth.default
  ? StyledFirebaseAuth.default
  : StyledFirebaseAuth;

// Configuration for initializing the Firebase app. This includes the project's specific settings required to connect to Firebase services.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "peer-to-peering.firebaseapp.com",
  projectId: "peer-to-peering",
  storageBucket: "peer-to-peering.appspot.com",
  messagingSenderId: "308858443055",
  appId: "1:308858443055:web:5a670a54e2cfa985567dda",
  measurementId: "G-5VDDR1HDEK",
};

// Initialize the Firebase app with the provided configuration. This is the first step to use Firebase services in the app.
export const app = initializeApp(firebaseConfig);

// Initialize the Firebase Authentication service. This enables user authentication features in the app.
export const auth = getAuth(app);

// Initialize Firestore, Firebase's NoSQL cloud database service. This allows the app to store and sync data between users in real-time.
export const firestore = getFirestore(app);

// Configuration for the FirebaseUI Auth component, specifying how the authentication UI behaves and which authentication methods are available.
export const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};
