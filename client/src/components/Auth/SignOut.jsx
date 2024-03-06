import { auth } from "../../database/firebaseResources";

/**
 * SignOut component provides a user interface for signing out of the application.
 * It renders a button that, when clicked, signs the user out using Firebase Authentication.
 */
export const SignOut = () => {
  return (
    <div>
      {/* Button triggers the signOut method on the auth object to sign the user out */}
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};
