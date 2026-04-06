import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const GoBackButton = ({
  className = "",
  variant = "secondary",
  fallback = "/",
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // react router doesn't expose history length, so use window.history as a fallback.
    const canGoBack = window.history.state && window.history.state.idx > 0;
    if (canGoBack) {
      navigate(-1);
    } else {
      // if there's no history stack entry, redirect to a safe default (home)
      navigate(fallback);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleGoBack}
      className={`d-flex align-items-center gap-2 ${className}`}
    >
      <ArrowLeft /> Go Back
    </Button>
  );
};

export default GoBackButton;
