import { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { auth } from "./database/firebaseResources";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { createUser } from "./App.utilities";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { Feed } from "./components/Feed/Feed";
import { SignOut } from "./components/Auth/SignOut";

/**
 * The App component is the root component of the application, responsible for
 * rendering the application's UI based on the authentication state of the user.
 */
function App() {
  // State hook for managing the loading state of the application.
  const [isLoading, setIsLoading] = useState(true);
  // State hook for storing the authenticated user's data.
  const [userData, setUserData] = useState({});

  // Effect hook to monitor authentication state changes.
  useEffect(() => {
    // Subscribes to authentication state changes and updates user data accordingly.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let result = await createUser(user); // Create user in Firestore if not exists.
      setUserData(result); // Update application state with user data.
      setIsLoading(false); // Set loading state to false.
    });

    // Cleanup function to unsubscribe from the auth listener on component unmount.
    return () => unsubscribe();
  }, []);

  // Renders a loading indicator while the application is fetching user data.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Conditional rendering based on the user's authentication state.
  return (
    <div>
      {isEmpty(userData) ? (
        // Renders the WelcomePage and Auth components for unauthenticated users.
        <>
          <WelcomePage />
          <Auth />
        </>
      ) : (
        // Renders the Feed and SignOut components for authenticated users.
        <>
          <Feed userData={userData} />
          <SignOut />
        </>
      )}
    </div>
  );
}

export default App;
