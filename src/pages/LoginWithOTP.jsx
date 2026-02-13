import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

const LoginWithOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger"); // danger or success

  const validateEmail = (email) => {
    const emailRegex = /^@?[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length < 60;
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setAlertMessage("Invalid e-mail address. Please insert a valid e-mail address.");
      setAlertVariant("danger");
      return;
    }

    setAlertMessage("");
    try {
      const response = await fetch("https://tr-playground-email-backend.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP.");
      }

      const result = await response.json();
      setAlertMessage(result.message || "OTP sent successfully!");
      setAlertVariant("info");
      setStep(2);
    } catch (error) {
      setAlertMessage("Failed to send OTP. Please try again later.");
      setAlertVariant("danger");
    }
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      setAlertMessage("Validation code must be 6 digits.");
      setAlertVariant("danger");
      return;
    }

    setAlertMessage("");
    try {
      const response = await fetch("https://tr-playground-email-backend.onrender.com/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typedCode: otp }),
      });

      const result = await response.json();
      if (response.ok) {
          setAlertMessage("Login Successful");
          setAlertVariant("success");
      } else {
          setAlertMessage(result.message || "Invalid OTP.");
          setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage("Failed to verify OTP. Please try again later.");
      setAlertVariant("danger");
    }
  };

  return (
    <Layout
      title={"Login with OTP"}
      description={"Enter your email to receive a One-Time Password (OTP) to login."}
    >
      <Container className="mt-4 d-flex justify-content-center align-items-center">
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <Form>
              {step === 1 && (
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
                  <Button variant="primary" className="mt-3 w-100" onClick={handleSendOTP}>
                    Send OTP
                  </Button>
                </Form.Group>
              )}

              {step === 2 && (
                <Form.Group controlId="formOTP">
                  <Form.Label>One-Time Password</Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                   <Button variant="primary" className="mt-3 w-100" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button 
                    variant="link" 
                    className="mt-2 w-100" 
                    onClick={() => {
                        setStep(1);
                        setAlertMessage("");
                        setOtp("");
                    }}
                  >
                    Back to Email
                  </Button>
                </Form.Group>
              )}

              {alertMessage && (
                <Alert
                  className="mt-4"
                  variant={alertVariant}
                >
                  <small>{alertMessage}</small>
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default LoginWithOTP;
