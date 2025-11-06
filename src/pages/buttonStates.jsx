import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/buttonStates.css";

const ButtonStates = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isConditionalEnabled, setIsConditionalEnabled] = useState(false);

  return (
    <Layout
      title="Button States Demo"
      description="Demonstration of different button states: active, inactive, clickable, and non-clickable."
    >
      <div className="demo-content button-states-demo">
        <div className="button-section">
          <h3>Active Button</h3>
          <button
            className="btn-demo btn-enabled"
            onClick={() => setClickCount(clickCount + 1)}
          >
            Click Me
          </button>
          <p className="click-count">Clicks: {clickCount}</p>
        </div>

        <div className="button-section">
          <h3>Disabled Button</h3>
          <button className="btn-demo btn-disabled" disabled>
            Disabled Button
          </button>
        </div>

        <div className="button-section">
          <h3>Non-Clickable</h3>
          <button className="btn-demo btn-not-clickable">
            Non-Clickable Button
          </button>
        </div>

        <div className="button-section">
          <h3>Conditional Button</h3>
          <div className="conditional-content">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={isConditionalEnabled}
                onChange={() => setIsConditionalEnabled(!isConditionalEnabled)}
              />
              Enable button
            </label>
            <button
              className={`btn-demo ${
                isConditionalEnabled ? "btn-enabled" : "btn-disabled"
              }`}
              disabled={!isConditionalEnabled}
            >
              Conditional Button
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ButtonStates;
