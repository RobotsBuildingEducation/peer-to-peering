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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let result = await createUser(user);
      setUserData(result);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEmpty(userData) ? (
        <>
          {" "}
          <WelcomePage />
          <Auth />
        </>
      ) : (
        <>
          <Feed userData={userData} />
          <SignOut />
        </>
      )}
    </div>
  );
}

export default App;
