import { auth } from "../../database/firebaseResources";

export const SignOut = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};
