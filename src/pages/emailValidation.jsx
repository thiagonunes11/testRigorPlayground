import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '../components/Layout';

const EmailValidation = () => {
  const [email, setEmail] = useState("");
  const [emailAlertMessage, setEmailAlertMessage] = useState("");
  const [codeAlertMessage, setCodeAlertMessage] = useState("");
  const [isEmailSuccess, setIsEmailSuccess] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);
  const [validationCode, setValidationCode] = useState("");

  const handleSendClick = async () => {
    if (!validateEmail(email)) {
      setEmail("");
      setEmailAlertMessage("Invalid e-mail address. Please insert a valid e-mail address.");
      setIsEmailSuccess(false);
      return;
    }

    setEmailAlertMessage("");
    try {
      const response = await fetch("https://tr-playground-email-backend.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send the e-mail.");
      }

      const result = await response.json();
      setEmailAlertMessage(result.message);
      setIsEmailSuccess(true);
    } catch (error) {
      setEmailAlertMessage("Failed to send the e-mail. Please try again later.");
      setIsEmailSuccess(false);
    }
  };

  const handleSendCode = async () => {
    if (validationCode.length !== 6) {
      setCodeAlertMessage("Validation code must be 6 digits.");
      setIsCodeSuccess(false);
      return;
    }

    setCodeAlertMessage("");
    try {
      const response = await fetch("https://tr-playground-email-backend.onrender.com/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "typedCode": validationCode }),
      });

      const result = await response.json();
      setCodeAlertMessage(result.message);
      setIsCodeSuccess(response.ok === true);

    } catch (error) {
      setCodeAlertMessage("Failed to verify the code. Please try again later.");
      setIsCodeSuccess(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^@?[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length < 60;
  };

  return (
    <Layout
      title={"Simulated 2FA"}
      description={"Enter the email address and click the button to send a random 6-digit auth code."}
    >
      <div className="row m-4">
        <div className="col p-3">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <button className="btn btn-primary btn-modern" onClick={handleSendClick}>Send e-mail</button>

          {emailAlertMessage && (
            <div className="form-group pt-4">
              <div className={`alert ${isEmailSuccess ? "alert-info" : "alert-danger"}`} role="alert">
                <small>{emailAlertMessage}</small>
              </div>
            </div>
          )}

          <div className="form-group mt-5">
            <label htmlFor="inputValidationCode">Validation Code</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="form-control"
              id="inputValidationCode"
              placeholder="Enter validation code"
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-modern mt-2" onClick={handleSendCode}>Verify</button>

          {codeAlertMessage && (
            <div className="form-group pt-4">
              <div className={`alert ${isCodeSuccess ? "alert-info" : "alert-danger"}`} role="alert">
                <small>{codeAlertMessage}</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EmailValidation;
