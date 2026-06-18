import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/overlappedElements.css";

const OverlappedElements = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [overlayClicked, setOverlayClicked] = useState(false);

  return (
    <Layout
      title="Overlapped Elements"
      description="Interact with elements that are visually covered by other elements."
    >
      <div className="overlap-section">
        <h2 className="overlap-section-title">Fully Covered Elements</h2>
        <p className="overlap-section-description">
          The elements below (button, checkbox, and input) are{" "}
          <strong>completely covered</strong> by a front overlay panel with ~70%
          opacity. Try interacting with both the overlay and the hidden elements
          behind it.
        </p>

        <div className="fully-covered-container">
          {/* Back elements */}
          <div className="covered-elements">
            <button
              id="covered-button"
              className="covered-btn"
              onClick={() => setBtnClicked(true)}
            >
              Hidden Button
            </button>

            <label className="covered-checkbox-label">
              <input
                id="covered-checkbox"
                type="checkbox"
                className="covered-checkbox"
                checked={checkboxChecked}
                onChange={() => setCheckboxChecked(!checkboxChecked)}
              />
              Hidden Checkbox
            </label>

            <input
              id="covered-input"
              type="text"
              className="covered-input"
              placeholder="Hidden input..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {/* Front overlay */}
          <div
            id="front-overlay"
            className="front-overlay"
            onClick={() => setOverlayClicked(true)}
          >
            <span className="front-overlay-label">Front Overlay</span>
            <span className="front-overlay-hint">Click me</span>
          </div>
        </div>

        {/* Feedback messages */}
        <div className="overlap-feedback-area">
          {overlayClicked && (
            <div className="overlap-feedback success">
              ✓ You clicked the <strong>Front Overlay</strong>!
            </div>
          )}
          {btnClicked && (
            <div className="overlap-feedback success">
              ✓ You clicked the <strong>Hidden Button</strong> behind the
              overlay!
            </div>
          )}
          {checkboxChecked && (
            <div className="overlap-feedback success">
              ✓ You toggled the <strong>Hidden Checkbox</strong> behind the
              overlay!
            </div>
          )}
          {inputValue && (
            <div className="overlap-feedback success">
              ✓ You typed in the <strong>Hidden Input</strong>:{" "}
              <em>{inputValue}</em>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OverlappedElements;
