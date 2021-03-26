import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./auth-page.style.scss";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="container">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default AuthPage;
