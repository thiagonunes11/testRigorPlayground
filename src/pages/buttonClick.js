import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ButtonClick() {
    const [isVisible, setIsVisible] = useState(false);

    const turnTextVisible = () => {
        setIsVisible(true);
    };

    return (
        <div>
            <main className="container text-center mt-5">
                <div className="row justify-content-center">
                    <div className="col-6 border p-2 pt-4">
                        <h1 className="fs-2 fw-bold">Button click</h1>
                        <p>
                            <small>Click the button to reveal the hidden text.</small>
                        </p>
                    </div>
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
