import {
  auth,
  AuthComponent,
  uiConfig,
} from "../../database/firebaseResources";

export const Auth = () => {
  return (
    <AuthComponent
      id="firebaseui-auth-container"
      uiConfig={uiConfig}
      firebaseAuth={auth}
    />
  );
};
