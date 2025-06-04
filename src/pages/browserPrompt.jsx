import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import '../styles/homePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BrowserPrompt = () => {
  const [name, setName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  // Function to show the prompt
  const showPrompt = () => {
    const userName = prompt("Please enter your name:");
    if (userName && userName.trim() !== "") {
      setName(userName);
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  };

  // Effect to trigger prompt if URL contains "browserpromptonload"
  useEffect(() => {
    if (window.location.pathname.toLowerCase().includes("browserpromptonload")) {
      showPrompt();
    }
  }, []);

  return (
    <Layout
      title={"Browser Prompt"}
      description={"Click the buttons to interact with the prompt."}
    >
      <div className="row mt-5 justify-content-center text-center">
        {showWelcome && (
          <p id="welcomeText">
            Welcome, <span id="nameText">{name}</span>
          </p>
        )}

        <div className="row mt-5">
          <div className="col-12">
            <button className="btn btn-primary btn-modern" onClick={showPrompt}>
              Click this button...
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrowserPrompt;
