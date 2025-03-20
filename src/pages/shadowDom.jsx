import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap if not globally included
import Demo from "../components/Demo.jsx";


const ShadowDOM = () => {
  useEffect(() => {
    // Handling First Button Click
    const firstButton = document.querySelector("body > main > div:nth-child(2) > div > button");
    if (firstButton) {
      firstButton.addEventListener("click", () => {
        firstButton.textContent = "First button";
      });
    }

    // Creating a Shadow DOM with JavaScript
    const host = document.getElementById("shadowDom");
    if (host && !host.shadowRoot) {
      const shadow = host.attachShadow({ mode: "open" });

      const firstParagraph = document.createElement("p");
      firstParagraph.textContent = "And this text is present inside a shadow DOM created with JavaScript.";
      shadow.appendChild(firstParagraph);

      const secondParagraph = document.createElement("p");
      secondParagraph.textContent = "The page CSS also does not work here.";
      shadow.appendChild(secondParagraph);

      const button = document.createElement("button");
      button.textContent = "No CSS here either";
      shadow.appendChild(button);

      button.addEventListener("click", () => {
        button.textContent = "Third button";
      });
    }
  }, []);

  return (
    <>

      {/* Main Content */}
      <Demo>
        <div className="row justify-content-center text-center mb-5">
          <div className="col-6 border p-2">
            <h1 className="fs-2 fw-bold mt-3 mb-4">Shadow DOM</h1>
            <p>
              <small>There are multiple different implementations of shadow DOMs with buttons that can be interacted with.</small>
            </p>
          </div>
        </div>

        {/* Regular Content */}
        <div className="row m-4">
          <div className="col border p-3">
            <p>This text is present on the page outside of any shadow DOM.</p>
            <button type="button" className="btn btn-primary">We have CSS here!</button>
          </div>
        </div>

        {/* Template Shadow DOM */}
        <div className="row m-4">
          <div className="col border p-3">
            <p>This text, however, is present inside a template shadow DOM.</p>
            <p>As you can see, the page CSS does not work here, check the following button:</p>
            <button type="button" className="btn btn-primary" onClick={(e) => (e.target.textContent = "Second button")}>
              But no CSS here :(
            </button>
          </div>
        </div>

        {/* Shadow DOM Created by JavaScript */}
        <div className="row m-4">
          <div className="col border p-3" id="shadowDom"></div>
        </div>

        {/* Nested Shadow DOM Templates */}
        <div className="row m-4">
          <div className="col border p-3">
            <p>This text is inside a different template shadow DOM.</p>

            <div>
              <p>This one is a second level shadow DOM: inside a template that's inside the before-mentioned template.</p>

              <div>
                <p>And this one is a third-level shadow DOM.</p>
              </div>
            </div>
          </div>
        </div>
      </Demo>
    </>
  );
};

export default ShadowDOM;
