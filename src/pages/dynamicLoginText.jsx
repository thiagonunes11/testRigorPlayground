import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Demo from "../components/Demo.jsx";

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

  // State for button text
  const [buttonText, setButtonText] = useState("");

  // State for showing login success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Change button text on component mount
  useEffect(() => {
    setButtonText(possibleNames[Math.floor(Math.random() * possibleNames.length)]);
  }, []);

  // Handle button click
  const handleLoginClick = () => {
    setShowSuccess(true);
  };

  return (
    <Demo>
        <div className="row justify-content-center text-center mb-5">
          <div className="col-6 border p-2">
            <h1 className="fs-2 fw-bold mt-3 mb-4">Dynamic Login Text</h1>
            <p><small>Leverage the auto-healing AI feature for signing in on this login page in which the button changes the text each refresh.</small></p>
          </div>
        </div>

        {/* Login Form */}
        <div className="row m-4">
          <div className="col p-3">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value="example@example.com" disabled />
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value="examplepassword" disabled />
            </div>
            <br />
            {/* Dynamic Login Button */}
            <button className="btn btn-primary" onClick={handleLoginClick}>{buttonText}</button>

            {/* Success Message */}
            {showSuccess && (
              <div className="form-group pt-4">
                <div className="alert alert-info" role="alert">
                  <small>Successful login!</small>
                </div>
              </div>
            )}
          </div>
        </div>
    </Demo>
  );
};

export default DynamicLogin;
