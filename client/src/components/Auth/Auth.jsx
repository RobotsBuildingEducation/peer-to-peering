import {
  auth,
  AuthComponent,
  uiConfig,
} from "../../database/firebaseResources";
/**
 * Auth component utilizes FirebaseUI for authentication, wrapping it in a React component for ease of use.
 * It renders the authentication UI provided by FirebaseUI, configured with specified options.
 */
export const Auth = () => {
  return (
    // Renders the FirebaseUI authentication component with custom configuration.
    <AuthComponent
      id="firebaseui-auth-container" // Unique identifier for the container element.
      uiConfig={uiConfig} // Configuration object for FirebaseUI (authentication methods, callbacks, etc.).
      firebaseAuth={auth} // The Firebase Auth instance to use for authentication.
    />
  );
};
