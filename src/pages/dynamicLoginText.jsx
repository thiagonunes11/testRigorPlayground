import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";

const DynamicLogin = () => {
  // List of possible button texts (contextual for login)
  const possibleNames = [
    "Log In",
    "Sign In",
    "Access Account",
    "Enter Account",
    "Authenticate",
    "Login to Your Account",
    "Sign Into Your Account",
    "Member Login",
    "User Login",
    "Account Login",
    "Access Portal",
    "Login Here",
    "Enter Credentials",
    "Start Session",
    "Begin Session",
    "Secure Login",
    "Customer Login",
    "Client Login",
    "Admin Login",
    "Employee Login",
    "Staff Login",
    "Manager Login",
    "Subscriber Login",
  ];

  // States
  const [buttonText, setButtonText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Change button text on component mount
  useEffect(() => {
    setButtonText(
      possibleNames[Math.floor(Math.random() * possibleNames.length)]
    );
  }, []);

  // Handle button click
  const handleLoginClick = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    // Simple email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setShowSuccess(true);
  };

  return (
    <Layout
      title={"Dynamic Login Text"}
      description={
        "Leverage the auto-healing AI feature for signing in on this login page in which the button changes the text each refresh."
      }
    >
      {/* Login Form */}
      <div className="row m-4">
        <div className="col p-3">
          <form onSubmit={handleLoginClick}>
            <div className="form-group">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Dynamic Login Button */}
            <button
              type="submit"
              className="btn btn-primary btn-modern"
              id="login-button"
              name="login"
              data-testid="login-button"
              aria-label="Login"
            >
              {buttonText}
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="form-group pt-4">
                <div className="alert alert-success" role="alert">
                  Successful login! Welcome back.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DynamicLogin;
