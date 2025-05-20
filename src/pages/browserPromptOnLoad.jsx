import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '../components/Layout';
const BrowserPromptOnLoad = () => {
  return (
    <Layout
      title={"Browser Prompt"}
      description={"Click the buttons to interact with the prompt."}
    >
      <div className="row mt-5 justify-content-center text-center">
        <p id="welcomeText" style={{ display: "none" }}>
          Welcome, <span id="nameText"></span>
        </p>

        <div className="row mt-5">
          <a href="browserPrompt">
            <button id="clickableButton" className="btn btn-primary btn-modern">
              Go Back
            </button>
          </a>
        </div>
      </div>

    </Layout>
  );
};

export default BrowserPromptOnLoad;
