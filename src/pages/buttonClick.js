import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Prompt from '../components/Prompt.js'

function ButtonClick() {
    const [isVisible, setIsVisible] = useState(false);

    const turnTextVisible = () => {
        setIsVisible(true);
    };

    return (
        <div>
            <main className="container text-center mt-5">
                <div className="row justify-content-center">
                    <Prompt title="Button click" instructions="Click the button to reveal the hidden text."/>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <button
                            id="clickableButton"
                            className="btn btn-primary"
                            onClick={turnTextVisible}
                        >
                            Click this button
                        </button>
                        <p
                            id="textElement"
                            className="mt-3"
                            style={{ visibility: isVisible ? "visible" : "hidden" }}
                        >
                            This text is now visible!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ButtonClick;
