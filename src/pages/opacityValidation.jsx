import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/opacityValidation.css";

const opacityLevels = [
  { id: "opacity-100", opacity: 1, label: "Opacity 100" },
  { id: "opacity-50", opacity: 0.5, label: "Opacity 50" },
  { id: "opacity-10", opacity: 0.1, label: "Opacity 10" },
  { id: "opacity-01", opacity: 0.01, label: "Opacity 1" },
  { id: "opacity-0", opacity: 0, label: "Opacity 0" },
];

const OpacityValidation = () => {
  const [clickedLevel, setClickedLevel] = useState(null);

  return (
    <Layout
      title="Opacity Validation"
      description="Interact with elements rendered at different opacity levels."
    >
      <div className="opacity-section">
        <h2 className="opacity-section-title">Opacity Levels</h2>
        <p className="opacity-section-description">
          Every card below is present in the DOM and clickable. The only
          difference between them is the <code>opacity</code> value applied to
          the card.
        </p>

        <div className="opacity-levels-grid">
          {opacityLevels.map((level) => (
            <div
              key={level.id}
              id={`${level.id}-card`}
              className="opacity-card"
              style={{ opacity: level.opacity }}
            >
              <span className="opacity-card-value">
                opacity: {level.opacity}
              </span>
              <p className="opacity-card-text">{level.label} text</p>
              <button
                id={`${level.id}-button`}
                className="btn-modern btn-primary"
                onClick={() => setClickedLevel(level.label)}
              >
                {level.label} button
              </button>
            </div>
          ))}
        </div>

        <div className="opacity-feedback-area">
          {clickedLevel && (
            <div className="opacity-feedback success">
              ✓ You clicked the <strong>{clickedLevel} button</strong>!
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OpacityValidation;
