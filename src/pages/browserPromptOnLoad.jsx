import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Demo from "../components/Demo.jsx";

const BrowserPromptOnLoad = () => {
  return (
    <Demo>



        <div className="row justify-content-center">
          <div className="col-6 border p-2 pt-4">
            <h1 className="fs-2 fw-bold">Browser Prompt</h1>
            <p>
              <small>Click the buttons to interact with the prompt.</small>
            </p>
          </div>
        </div>

        <div className="row mt-5 justify-content-center text-center">
          <p id="welcomeText" style={{ display: "none" }}>
            Welcome, <span id="nameText"></span>
          </p>

          <div className="row mt-5">
            <a href="browserPrompt">
              <button id="clickableButton" className="btn btn-primary">
                Go Back
              </button>
            </a>
          </div>
        </div>

    </Demo>
  );
};

export default BrowserPromptOnLoad;
