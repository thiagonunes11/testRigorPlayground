import React, { useState } from 'react';
import logo from "../assets/logo.png";
import Demo from "../components/Demo.jsx";

const SvgElements = () => {
    const [showContent, setShowContent] = useState(false);
    const [textContent, setTextContent] = useState('#1 Automation Tool');
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleCloseButtonClick = () => {
        setShowContent(true);
    };

    const handleRightArrowClick = () => {
        setTextContent('testRigor');
        setShowRightArrow(false);
    };

    const handleLeftArrowClick = () => {
        setTextContent('#1 Automation Tool');
        setShowRightArrow(true);
    };

    return (
        <Demo>

                <div className="row justify-content-center text-center mb-5">
                    <div className="col-6 border p-2">
                        <h1 className="fs-2 fw-bold mt-3 mb-4">SVG Elements</h1>
                        <p>Interact with SVG elements and sub-elements.</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-3 text-center">
                        <div className="tab-container">
                            {!showContent ? (
                                <button id="closeButton" className="close-btn" onClick={handleCloseButtonClick}>
                                    <svg aria-label="close" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM7.756 9.167a1 1 0 1 1 1.415-1.414L12 10.585l2.828-2.828a1 1 0 1 1 1.414 1.414L13.415 12l2.828 2.83a1 1 0 1 1-1.415 1.414L12 13.414l-2.83 2.83a1 1 0 0 1-1.414-1.414l2.83-2.83-2.83-2.833z" fill="#ff0000"></path>
                                    </svg>
                                    <svg height="30" width="100" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="20" fill="black" font-family="Roboto" font-weight="bold">Hello World!</text>
                                    </svg>
                                </button>
                            ) : (
                                <div id="buttonClicked" className="center">
                                    <svg aria-label="testrigor logo" width="200" height="200">
                                        <image href={logo} x="25" y="25" height="150px" width="150px"/>
                                    </svg>
                                    <svg aria-label="number one automation tool" height="50" width="150" xmlns="http://www.w3.org/2000/svg">
                                        <text x="30" y="30" fill="none" stroke="red" font-family="Roboto" font-size="12">{textContent}</text>
                                    </svg>
                                    {showRightArrow ? (
                                        <button id="rightArrowButton" className="btn btn-primary" onClick={handleRightArrowClick}>
                                            <svg aria-label="right arrow" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                                <path d="M8 5l7 7-7 7" stroke="#white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    ) : (
                                        <button id="leftArrowButton" className="btn btn-primary" onClick={handleLeftArrowClick}>
                                            <svg aria-label="left arrow" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                                <path d="M16 19l-7-7 7-7" stroke="#white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
 
        </Demo>
    );
};

export default SvgElements;