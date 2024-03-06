// Imports Firebase Firestore and utility functions to interact with the database.
import { firestore } from "./database/firebaseResources";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

/**
 * Asynchronously checks if a user exists in Firestore and creates a new user document if not.
 * @param {Object} user - The user object provided by Firebase authentication.
 * @returns {Object} The user's data from Firestore.
 */
export const createUser = async (user) => {
  if (user) {
    // References a user document by UID.
    const userRef = doc(firestore, "users", user.uid);
    // Attempts to fetch the user document.
    const userSnap = await getDoc(userRef);

    // If the user doesn't exist, initializes their document with basic information.
    if (!userSnap.exists()) {
      let initialData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      // Creates the document in Firestore.
      setDoc(userRef, initialData);
      // Returns the initialized data for further use.
      return initialData;
    } else {
      // If user exists, returns their data.
      return userSnap.data();
    }
  }
};

/**
 * Creates a reference for a new document in the "posts" collection with a unique ID.
 * @returns {DocumentReference} A reference to the newly created post document.
 */
export const createPost = () => {
  return doc(collection(firestore, "posts"));
};

/**
 * Generates a document reference for a new post within a user-specific "posts" subcollection.
 * @param {string} userId - The user's unique identifier.
 * @param {DocumentReference} newPostRef - The reference to the new post in the global "posts" collection.
 * @returns {DocumentReference} A reference to the newly created user-specific post document.
 */
export const createUserPost = (userId, newPostRef) => {
  return doc(firestore, `users/${userId}/posts`, newPostRef.id);
};
