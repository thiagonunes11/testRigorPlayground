import React, { useState } from "react";
import Prompt from '../components/Prompt.jsx'
import Demo from "../components/Demo.jsx";

function RightClick() {
  const [buttonText, setButtonText] = useState("Right click here");
  const [buttonClass, setButtonClass] = useState("btn btn-outline-secondary");

  const handleRightClick = (event) => {
    event.preventDefault();
    setButtonText("The button was right clicked");
    setButtonClass("btn btn-outline-primary");
  };

  return (
    <Demo>
     
            <div className="row justify-content-center mb-5">
                <div className="col-6 border p-2 pt-4">
                    <h2><b>Right click</b></h2>
                    <p className="mt-4">
                        <small>The button below will change itself on a mouse right click.</small>
                    </p>
               </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-4 p-3">
                <div className="row mt-3">
                 <button className={buttonClass} onContextMenu={handleRightClick}>
                    {buttonText}
                  </button>
             </div>
             </div>
         </div>
     </Demo>
  );
}

export default RightClick;