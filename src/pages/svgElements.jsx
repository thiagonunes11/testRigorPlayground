import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import Layout from '../components/Layout';
const SvgElements = () => {
  const [showContent, setShowContent] = useState(false);
  const [textContent, setTextContent] = useState("#1 Automation Tool");
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleCloseButtonClick = () => {
    setShowContent(true);
  };

  const handleRightArrowClick = () => {
    setTextContent("testRigor");
    setShowRightArrow(false);
  };

  const handleLeftArrowClick = () => {
    setTextContent("#1 Automation Tool");
    setShowRightArrow(true);
  };

  return (
    <Layout
      title="SVG Elements"
      description="Interact with SVG elements and sub-elements."
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
          body {
            font-family: "Roboto", sans-serif !important;
          }

          .tab-container {
            position: relative;
            display: inline-block;
            padding: 10px 20px;
            border: 1px solid #ccc;
            background-color: #ffffff;
            margin: 20px 0;
            width: 100%;
            max-width: 400px;
          }

          .close-btn {
            position: absolute;
            top: -10px;
            right: -10px;
            background: transparent;
            border: none;
            cursor: pointer;
            border-radius: 50%;
            background-color: white;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          }

          .tab-container p {
            margin: 0;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
          }

          .svg-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          @media (max-width: 576px) {
            .tab-container {
              padding: 8px 15px;
            }
            
            .logo-image {
              height: 120px !important;
              width: 120px !important;
            }
          }
        `}
      </style>

      <Container>
        <Row className="justify-content-center text-center mb-4 mb-md-5">
          <Col xs={12} md={8} lg={6} className="border p-2 p-md-3">
            <h1 className="fs-2 fs-md-1 fw-bold mt-2 mt-md-3 mb-3 mb-md-4">SVG Elements</h1>
            <p className="mb-0">Interact with SVG elements and sub-elements.</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
            <div className="tab-container">
              {!showContent ? (
                <button
                  id="closeButton"
                  className="close-btn"
                  onClick={handleCloseButtonClick}
                  aria-label="Close"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ff0000"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM7.756 9.167a1 1 0 1 1 1.415-1.414L12 10.585l2.828-2.828a1 1 0 1 1 1.414 1.414L13.415 12l2.828 2.83a1 1 0 1 1-1.415 1.414L12 13.414l-2.83 2.83a1 1 0 0 1-1.414-1.414l2.83-2.83-2.83-2.833z"
                      fill="#ff0000"
                    />
                  </svg>
                </button>
              ) : null}
              
              <svg height="40" width="100%" viewBox="0 0 120 40" preserveAspectRatio="xMidYMid meet">
                <text
                  x="50%"
                  y="50%"
                  fill="black"
                  fontFamily="Roboto"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  Hello World!
                </text>
              </svg>

              {showContent && (
                <div id="buttonClicked" className="svg-content mt-3">
                  <svg aria-label="testrigor logo" width="200" height="200" viewBox="0 0 200 200">
                    <image
                      href={logo}
                      x="25"
                      y="25"
                      height="150"
                      width="150"
                      className="logo-image"
                    />
                  </svg>
                  
                  <svg height="50" width="100%" viewBox="0 0 150 50" preserveAspectRatio="xMidYMid meet">
                    <text
                      x="30"
                      y="30"
                      fill="none"
                      stroke="red"
                      fontFamily="Roboto"
                      fontSize="12"
                    >
                      {textContent}
                    </text>
                  </svg>

                  <Button
                    variant="primary"
                    id={showRightArrow ? "rightArrowButton" : "leftArrowButton"}
                    onClick={showRightArrow ? handleRightArrowClick : handleLeftArrowClick}
                    className="mt-2"
                  >
                    <svg
                      aria-label={showRightArrow ? "right arrow" : "left arrow"}
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d={showRightArrow ? "M8 5l7 7-7 7" : "M16 19l-7-7 7-7"}
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SvgElements;