import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const GoBackButton = ({ className = '', variant = 'secondary' }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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