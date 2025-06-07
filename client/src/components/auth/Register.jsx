import { useState } from "react";
import { useAuth } from "./../../context/AuthContext";

import AuthForm from "./AuthForm";
import AuthButton from "./AuthButton";

const Register = () => {
  const { registerAction } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !passwordConfirm) {
      setError("Please fill in all fields.");
      console.error("Please fill in all fields.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      console.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const newUser = {
        username,
        email,
        password,
        passwordConfirm,
      };

      const result = await registerAction(newUser);

      if (result.success) {
        console.log("Registration successful!");
      } else {
        setError(
          "Registration failed:",
          result.message || "An unknown error occurred."
        );
        console.error(
          "Registration failed:",
          result.message || "An unknown error occurred."
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong! Please try again.");
    } finally {
      setSubmitting(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setError("");
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          required
          value={username}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          required
          minLength={8}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label htmlFor="password-confirm">
        Confirm Password
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Confirm Password"
          required
          value={passwordConfirm}
          onChange={(e) => handleChange(e)}
        />
      </label>

      {error && <small>{error}</small>}

      <AuthButton>{!submitting ? "Register" : "..."}</AuthButton>
    </AuthForm>
  );
};

export default Register;
