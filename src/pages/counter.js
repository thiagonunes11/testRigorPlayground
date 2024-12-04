import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Prompt from '../components/Prompt.js'
import Demo from '../components/Demo.js';

const Counter = () => {
    const [counter, setCounter] = useState(0);

    const onCounterButtonClick = () => {
        setCounter(counter + 1);
    }
  
    return (
        <Demo>
            <Prompt title="Counter" instructions="Click on the button in order to increase the counter value." />
            <Container>
                <Row className="mt-5 justify-content-center text-center">
                    <Col>
                        <Button variant="primary" onClick={onCounterButtonClick}>
                            Click here to increase the counter
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4 justify-content-center text-center">
                    <Col>
                        <h4>You've pressed the button {counter} times</h4>
                    </Col>
                </Row>
            </Container>
        </Demo>
    );
};

export default Counter;
