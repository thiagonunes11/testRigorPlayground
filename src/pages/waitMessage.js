import React, { useEffect, useState } from 'react';
import Prompt from '../components/Prompt.js'
import Demo from "../components/Demo.js";
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

export default WaitForMessage;
