import React, { useState } from 'react';
import Layout from '../components/Layout';

const HoldKeyClick = () => {
  const [message, setMessage] = useState('');

  const handleClick = (event) => {
    const isModifierPressed = event.ctrlKey || event.metaKey;

    if (isModifierPressed) {
      setMessage('Button clicked');
    } else {
      setMessage('Please hold Ctrl/Command');
    }
  };

  return (
    <Layout
      title="Hold Key Click Demo"
      description="Click the button while holding Ctrl (Windows/Linux) or Command (macOS)."
    >
      <div className="demo-content">
        <div className="text-center">
          <button
            type="button"
            className="btn-modern btn-primary mb-4"
            onClick={handleClick}
          >
            Click Me
          </button>
          {message && (
            <p className="text-secondary" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HoldKeyClick;
