import React, { useState, useEffect } from "react";

import Demo from "../components/Demo.jsx";

const BrowserPrompt = () => {
  const [name, setName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  // Function to show the prompt
  const showPrompt = () => {
    let userName;
    do {
      userName = prompt("Please enter your name:");
    } while (!userName);

    setName(userName);
    setShowWelcome(true);
  };

  // Effect to trigger prompt if URL contains "browserpromptonload"
  useEffect(() => {
    if (window.location.pathname.toLowerCase().includes("browserpromptonload")) {
      showPrompt();
    }
  }, []);

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
          {showWelcome && (
            <p id="welcomeText">
              Welcome, <span id="nameText">{name}</span>
            </p>
          )}

          <div className="row mt-5">
            <div className="col-12">
              <button className="btn btn-primary" onClick={showPrompt}>
                Click this button...
              </button>
            </div>
          </div>

          <div className="row mt-5">
               <a className="nav-link" href="browserPromptOnLoad">
              <button className="btn btn-primary">...Or this one</button>
            </a>
          </div>
        </div>

     </Demo>
  );
};

export default BrowserPrompt;
