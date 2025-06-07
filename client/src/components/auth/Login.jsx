import { useState } from "react";
import { useAuth } from "./../../context/AuthContext";

import AuthForm from "./AuthForm";
import AuthButton from "./AuthButton";

const Login = () => {
  const { loginAction } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      console.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const currentUser = {
        email,
        password,
      };

      const result = await loginAction(currentUser);

      if (result.success) {
        console.log("Login successful!");
      } else {
        setError(
          "Login failed:",
          result.message || "An unknown error occurred."
        );
        console.error(
          "Login failed:",
          result.message || "An unknown error occurred."
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong! Please try again.");
    } finally {
      setSubmitting(false);
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
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

      {error && <small>{error}</small>}

      <AuthButton>{!submitting ? "Log In" : "..."}</AuthButton>
    </AuthForm>
  );
};

export default Login;
