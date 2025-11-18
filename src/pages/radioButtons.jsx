import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/disabledButton.css";

const RadioButtons = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const paymentMethods = [
    { id: "flexRadioDefault1", label: "PayPal" },
    { id: "flexRadioDefault2", label: "Credit card" },
    { id: "flexRadioDefault3", label: "Debit card" },
    { id: "flexRadioDefault4", label: "Bank transfer" },
  ];

  const handleNext = () => {
    setIsSubmitted(true);
  };

  const handleCancel = () => {
    setIsSubmitted(false);
  };

  return (
    <Layout
      title={"Radio Buttons"}
      description={
        "Select one of the payment methods below by checking the associated radio button."
      }
    >
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col xs={4} className="border px-4 py-5">
            <h2 className="fs-3 fw-bold text-center pb-4">
              Select a payment method
            </h2>
            <Row className="my-5">
              <Col>
                <div className="card-body">
                  {paymentMethods.map((method) => (
                    <div className="form-check" key={method.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={method.id}
                        disabled={isSubmitted}
                        checked={selectedMethod === method.label}
                        onChange={(e) => setSelectedMethod(method.label)}
                      />
                      <label className="form-check-label" htmlFor={method.id}>
                        {method.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            <Row>
              <div className="d-grid gap-2 col-7 mx-auto pt-4">
                {!isSubmitted ? (
                  <button
                    className="btn btn-primary btn-modern"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary btn-disabled"
                    disabled
                    role="button"
                    aria-disabled="true"
                  >
                    Paying with {selectedMethod}
                  </button>
                )}

                {!isSubmitted ? (
                  <button
                    className="btn btn-light btn-disabled"
                    disabled
                    type="button"
                    aria-disabled="true"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="btn btn-dark"
                    role="button"
                    color="red"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default RadioButtons;
