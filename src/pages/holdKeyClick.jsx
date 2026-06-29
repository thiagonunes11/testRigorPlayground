import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';

const LONG_CLICK_THRESHOLD = 1;

const HoldKeyClick = () => {
  const pressStartRef = useRef(null);
  const [message, setMessage] = useState('');

  const handlePressStart = () => {
    pressStartRef.current = Date.now();
  };

  const handlePressEnd = (event) => {
    const duration = pressStartRef.current
      ? (Date.now() - pressStartRef.current) / 1000
      : 0;

    pressStartRef.current = null;

    const isModifierPressed = event.ctrlKey || event.metaKey;

    if (!isModifierPressed) {
      setMessage('Please hold Ctrl/Command');
      return;
    }

    if (duration >= LONG_CLICK_THRESHOLD) {
      setMessage('Long click performed');
      return;
    }

    setMessage('Button clicked');
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
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
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
