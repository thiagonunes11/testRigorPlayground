import React, { useState } from "react";
import Prompt from '../components/Prompt.jsx'
import Demo from "../components/Demo.jsx";

function ButtonClick() {
    const [isVisible, setIsVisible] = useState(false);

    const turnTextVisible = () => {
        setIsVisible(true);
    };

    return (
        <Demo>
            <Prompt title="Button click" instructions="Click the button to reveal the hidden text."/>

            <div className="row mt-5">
                <div className="col-12 text-center">
                    <button
                        id="clickableButton"
                        className="btn"
                        onClick={turnTextVisible}
                    >
                        Click this button
                    </button>
                    <p
                        id="textElement"
                        className="mt-3 text-light-muted"
                        style={{ visibility: isVisible ? "visible" : "hidden" }}
                    >
                        This text is now visible!
                    </p>
                </div>
            </div>
        </Demo>
    );
}

export default ButtonClick;
