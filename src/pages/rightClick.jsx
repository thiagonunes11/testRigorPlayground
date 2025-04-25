import React, { useState } from "react";
import Prompt from '../components/Prompt.jsx'
import Layout from '../components/Layout';
function RightClick() {
  const [buttonText, setButtonText] = useState("Right click here");
  const [buttonClass, setButtonClass] = useState("btn btn-outline-secondary");

  const handleRightClick = (event) => {
    event.preventDefault();
    setButtonText("The button was right clicked");
    setButtonClass("btn btn-outline-primary");
  };

  return (
    <Layout
      title="Right click"
      description="The button below will change itself on a mouse right click."
    >
      <div className="row justify-content-center">
        <div className="col-4 p-3">
          <div className="row mt-3">
            <button className={buttonClass} onContextMenu={handleRightClick}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RightClick;