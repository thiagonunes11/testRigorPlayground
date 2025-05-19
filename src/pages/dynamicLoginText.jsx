import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '../components/Layout';

const DynamicLogin = () => {
  // List of possible button texts
  const possibleNames = [
    "Log In", "Login", "Sign In", "Access Account", "Enter",
    "Log Into Your Account", "Sign Into Your Account", "Member Login",
    "User Access", "Account Entry", "Authenticate", "Join In",
    "User Login", "Account Login", "Sign On", "Access Portal",
    "Login Here", "Enter Account", "User Sign In", "Connect",
    "Begin Session", "Start Session", "Secure Login", "Customer Login",
    "Client Access", "Admin Login", "Employee Access", "Staff Login",
    "Manager Sign In", "Subscriber Access"
  ];

  // States
  const [buttonText, setButtonText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Change button text on component mount
  useEffect(() => {
    setButtonText(possibleNames[Math.floor(Math.random() * possibleNames.length)]);
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
      description={"Leverage the auto-healing AI feature for signing in on this login page in which the button changes the text each refresh."}
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
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
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
            <button type="submit" className="btn btn-primary btn-modern">
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