import React from "react";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      console.log("passwords don't match!");
      return;
    }

    if (!displayName || !email || !password || !confirmPassword) {
      console.log("You didn't complete all the fields!");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName, userType: "user" });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="auth__container">
        <h1 className="auth__title">Sign up</h1>
        <FormInput
          name="displayName"
          type="text"
          required
          label="Display Name"
          handleChange={this.handleChange}
          value={this.state.displayName}
        />
        <FormInput
          type="email"
          name="email"
          required
          label="Email"
          handleChange={this.handleChange}
          value={this.state.email}
        />
        <FormInput
          type="password"
          name="password"
          required
          label="Password"
          handleChange={this.handleChange}
          value={this.state.password}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          required
          label="Confirm Password"
          handleChange={this.handleChange}
          value={this.state.confirmPassword}
        />

        <button
          type="button"
          onClick={this.handleSubmit}
          className="auth__submit"
        >
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignUp;
