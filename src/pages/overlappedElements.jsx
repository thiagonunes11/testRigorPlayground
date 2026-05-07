import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/overlappedElements.css";

const OverlappedElements = () => {
  // Section 1 – Transparent overlay
  const [overlayClicked, setOverlayClicked] = useState(false);

  // Section 2 – Partially covered buttons
  const [partialClicked, setPartialClicked] = useState(null);

  // Section 3 – Stacked cards
  const [cardClicks, setCardClicks] = useState({ 1: false, 2: false, 3: false });

  // Section 4 – Input under banner
  const [inputValue, setInputValue] = useState("");

  // Section 5 – Overlapping checkboxes
  const [checks, setChecks] = useState({ A: false, B: false, C: false, D: false });

  // Section 6 – Floating action over link
  const [linkClicked, setLinkClicked] = useState(false);
  const [fabClicked, setFabClicked] = useState(false);

  const handleCardClick = (id) => {
    setCardClicks((prev) => ({ ...prev, [id]: true }));
  };

  const toggleCheck = (key) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedChecks = Object.entries(checks)
    .filter(([, v]) => v)
    .map(([k]) => k);

  return (
    <Layout
      title="Overlapped Elements"
      description="Interact with elements that are visually covered by other elements."
    >
      {/* ===== Section 1: Transparent Overlay ===== */}
      <div className="overlap-section">
        <h2 className="overlap-section-title">1. Transparent Overlay</h2>
        <p className="overlap-section-description">
          The button below is covered by a transparent overlay with{" "}
          <code>pointer-events: none</code>. Click the button through the overlay.
        </p>

        <div className="text-center">
          <div className="transparent-overlay-wrapper" style={{ display: "inline-block" }}>
            <button
              id="transparent-overlay-btn"
              className="transparent-overlay-target"
              onClick={() => setOverlayClicked(true)}
            >
              Click me through the overlay
            </button>
            <div className="transparent-overlay">
              <span className="overlay-label">overlay layer</span>
            </div>
          </div>

          {overlayClicked && (
            <div className="overlap-feedback success">
              ✓ Button clicked successfully through the transparent overlay!
            </div>
          )}
        </div>
      </div>

      {/* ===== Section 2: Partially Covered Buttons ===== */}
      <div className="overlap-section">
        <h2 className="overlap-section-title">2. Partially Covered Buttons</h2>
        <p className="overlap-section-description">
          Two buttons overlap each other. The green button is partially hidden behind the
          orange one. Try clicking each.
        </p>

        <div className="partial-overlap-container">
          <button
            id="partial-btn-back"
            className="partial-btn partial-btn-back"
            onClick={() => setPartialClicked("back")}
          >
            Behind Button
          </button>
          <button
            id="partial-btn-front"
            className="partial-btn partial-btn-front"
            onClick={() => setPartialClicked("front")}
          >
            Front Button
          </button>
        </div>

        {partialClicked && (
          <div className="text-center">
            <div className="overlap-feedback success">
              ✓ You clicked the{" "}
              <strong>{partialClicked === "back" ? "Behind (green)" : "Front (orange)"}</strong>{" "}
              button!
            </div>
          </div>
        )}
      </div>

      {/* ===== Section 3: Stacked Cards ===== */}
      <div className="overlap-section">
        <h2 className="overlap-section-title">3. Stacked Cards</h2>
        <p className="overlap-section-description">
          Three cards are stacked on top of each other. Click each card to mark it as
          visited. Cards on top partially cover the ones below.
        </p>

        <div className="stacked-cards-container">
          <div
            id="stacked-card-1"
            className="stacked-card stacked-card-1"
            onClick={() => handleCardClick(1)}
          >
            <h4>
              Card A — z-index: 1
              {cardClicks[1] && <span className="card-check">✓</span>}
            </h4>
            <p>Bottom card. Partially hidden.</p>
          </div>

          <div
            id="stacked-card-2"
            className="stacked-card stacked-card-2"
            onClick={() => handleCardClick(2)}
          >
            <h4>
              Card B — z-index: 2
              {cardClicks[2] && <span className="card-check">✓</span>}
            </h4>
            <p>Middle card. Covers Card A.</p>
          </div>

          <div
            id="stacked-card-3"
            className="stacked-card stacked-card-3"
            onClick={() => handleCardClick(3)}
          >
            <h4>
              Card C — z-index: 3
              {cardClicks[3] && <span className="card-check">✓</span>}
            </h4>
            <p>Top card. Covers Card B.</p>
          </div>
        </div>

        {Object.values(cardClicks).every(Boolean) && (
          <div className="text-center" style={{ marginTop: "1rem" }}>
            <div className="overlap-feedback success">
              ✓ All three stacked cards have been clicked!
            </div>
          </div>
        )}
      </div>

      {/* ===== Section 4: Input Under a Banner ===== */}
      <div className="overlap-section">
        <h2 className="overlap-section-title">4. Input Under a Banner</h2>
        <p className="overlap-section-description">
          A floating badge covers the top of the input field. Type text into the input
          despite the visual obstruction.
        </p>

        <div className="hidden-input-wrapper">
          <div className="hidden-input-banner">★ Featured Field</div>
          <input
            id="overlapped-input"
            className="hidden-input-field"
            type="text"
            placeholder="Type something here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && (
            <div className="hidden-input-echo">
              You typed: <strong>{inputValue}</strong>
            </div>
          )}
        </div>
      </div>

      {/* ===== Section 5: Overlapping Checkboxes ===== */}
      <div className="overlap-section">
        <h2 className="overlap-section-title">5. Overlapping Checkboxes</h2>
        <p className="overlap-section-description">
          Checkboxes that overlap each other horizontally with negative margins. Toggle
          each one.
        </p>

        <div className="overlap-checkbox-grid">
          {["A", "B", "C", "D"].map((key) => (
            <div
              key={key}
              className={`overlap-checkbox-item${checks[key] ? " checked" : ""}`}
              onClick={() => toggleCheck(key)}
            >
              <input
                id={`overlap-check-${key}`}
                type="checkbox"
                checked={checks[key]}
                onChange={() => toggleCheck(key)}
                onClick={(e) => e.stopPropagation()}
              />
              <label htmlFor={`overlap-check-${key}`} onClick={(e) => e.stopPropagation()}>Option {key}</label>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="checkbox-summary">
            Selected:{" "}
            <strong>{selectedChecks.length > 0 ? selectedChecks.join(", ") : "None"}</strong>
          </div>
        </div>
      </div>

      {/* ===== Section 6: Floating Action Button Over Content ===== */}
      <div className="overlap-section">
        <h2 className="overlap-section-title">6. Floating Action Button Over Content</h2>
        <p className="overlap-section-description">
          A floating action button (FAB) hovers over content that contains a clickable
          link. Both elements should be independently interactive.
        </p>

        <div className="floating-action-wrapper">
          <p className="floating-content-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Click the{" "}
            <span
              id="floating-content-link"
              className="floating-content-link"
              onClick={() => setLinkClicked(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLinkClicked(true)}
            >
              hidden link
            </span>{" "}
            in this paragraph, or press the floating button in the corner.
          </p>

          <button
            id="fab-button"
            className="floating-action-btn"
            onClick={() => setFabClicked(true)}
            aria-label="Floating action"
          >
            +
          </button>

          {(linkClicked || fabClicked) && (
            <div className="overlap-feedback success" style={{ marginTop: "0.5rem" }}>
              {linkClicked && fabClicked
                ? "✓ Both the link and the FAB were clicked!"
                : linkClicked
                ? "✓ Link clicked! Now try the floating button."
                : "✓ FAB clicked! Now try the link in the text."}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OverlappedElements;
