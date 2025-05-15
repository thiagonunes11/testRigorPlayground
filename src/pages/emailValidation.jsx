import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

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
        body: JSON.stringify({ typedCode: validationCode }),
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
      <Container className="mt-4 d-flex justify-content-center align-items-center">
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" className="mt-2" onClick={handleSendClick}>
                Send e-mail
              </Button>

              {emailAlertMessage && (
                <Alert
                  className="mt-4"
                  variant={isEmailSuccess ? "info" : "danger"}
                >
                  <small>{emailAlertMessage}</small>
                </Alert>
              )}

              <Form.Group controlId="formValidationCode" className="mt-5">
                <Form.Label>Validation Code</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Enter validation code"
                  value={validationCode}
                  onChange={(e) => setValidationCode(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" className="mt-2" onClick={handleSendCode}>
                Verify
              </Button>

              {codeAlertMessage && (
                <Alert
                  className="mt-4"
                  variant={isCodeSuccess ? "info" : "danger"}
                >
                  <small>{codeAlertMessage}</small>
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default EmailValidation;
