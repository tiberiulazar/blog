import { useState } from "react";
import { auth } from "../../firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      console.log("There are empty fields!");
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Signed in successfuly!");
        setEmail("");
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth__container">
      <h1 className="auth__title">Sign in</h1>
      <FormInput
        type="email"
        label="email"
        required
        name="email"
        value={email}
        handleChange={(event) => setEmail(event.target.value)}
      />
      <FormInput
        type="password"
        name="password"
        label="password"
        value={password}
        required
        handleChange={(event) => setPassword(event.target.value)}
      />
      {/* <input type="email" className="auth__input" />
      <input type="password" className="auth__input" /> */}
      <button type="button" onClick={handleSubmit} className="auth__submit">
        Sign in
      </button>
    </div>
  );
};

export default SignIn;
