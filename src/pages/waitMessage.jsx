import React, { useEffect, useState } from 'react';

const WaitMessage = () => {
    useEffect(() => {
        let counter = 5;

        function callTimeout() {
            document.getElementById("counter").innerHTML = counter;

            if (counter > 0) {
                counter--;
                setTimeout(callTimeout, 1000);
            } else {
                document.getElementById("secretMessage").hidden = false;
            }
        }

        callTimeout();
    }, []);

    return (
        <main className="container mt-5">
            <div className="row justify-content-center text-center">
                <div className="col-6 border p-2 pt-4">
                    <h1 className="fs-2 fw-bold">Wait for the Message</h1>
                    <p><small>In five seconds, the message will appear.</small></p>
                </div>
            </div>

            <div className="row mt-5 justify-content-center text-center">
                <h3>The secret message will appear in <span id="counter">3</span>...</h3>

                <div className="col-4 mt-3">
                    <div id="secretMessage" className="alert alert-success pb-0" role="alert" hidden>
                        <p>The secret message is: banana</p>
                    </div>
                </div>
            </div>
        </main>
    );
};


import Prompt from '../components/Prompt.jsx'
import Demo from "../components/Demo.jsx";
import { Collapse, Alert, Row, Col } from 'react-bootstrap';

function WaitForMessage() {
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        if (secondsLeft <= 0)
            return;

        const interval = setInterval(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [secondsLeft]);

    return (
        <Demo>
            <Prompt title="Wait for the Message" instructions="In five seconds, the message will appear."/>

            <Row className="mt-5">
                <Col className="">
                    <p className="fs-3">
                        The secret message will appear in {secondsLeft}...
                    </p>
                    <Collapse in={secondsLeft === 0}>
                        <div>
                            <Alert variant="success">The secret message is: <strong>banana</strong></Alert>
                        </div>
                    </Collapse>
                </Col>
            </Row>
        </Demo>
    );
}

export default WaitMessage;
