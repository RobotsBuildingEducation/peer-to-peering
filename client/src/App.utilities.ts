import { firestore } from "./database/firebaseResources";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const createUser = async (user) => {
  if (user) {
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      let initialData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      setDoc(userRef, initialData);
      return initialData;
    } else {
      return userSnap.data();
    }
  }
};
