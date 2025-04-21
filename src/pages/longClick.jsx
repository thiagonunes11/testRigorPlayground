import React, { useEffect, useState, useRef } from 'react';
import Prompt from '../components/Prompt.jsx'
import Layout from '../components/Layout'; import { Collapse, Alert, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LongClick() {
    const [isPressed, setIsPressed] = useState(false);
    const [isLongClick, setIsLongClick] = useState(false);

    const [clickPressCounter, setClickPressCounter] = useState(0);
    const [chosenClickTime, setChosenClickTime] = useState(1);

    useEffect(() => {
        let interval;

        if (isPressed) {
            const startTime = Date.now();
            interval = setInterval(() => {
                var timeValue = (Date.now() - startTime) / 1000;
                setClickPressCounter(timeValue.toFixed(2));
            }, 10);
        } else {
            clearInterval(interval);
            setIsLongClick(clickPressCounter >= chosenClickTime);
        }

        return () => clearInterval(interval);
    }, [isPressed]);

    return (
        <Layout
            title="Long Click"
            description="The button below will say if it was clicked by a long click or a normal click depending on the setting."
        >

            <Row className="mt-5">
                <Col className="">
                    <Form>
                        <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formPlaintextEmail">
                            <Form.Label column xs="3">
                                Select the time of a long click:
                            </Form.Label>
                            <Col xs="2">
                                <Form.Select aria-label="Select the time of a long click:" id="clickTimeSelect" onChange={(e) => { setChosenClickTime(e.target.value) }}>
                                    <option value="1" selected="selected">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className='mt-2 mb-4 d-flex justify-content-center'>
                <Col className="d-grid gap-2" xs="5">
                    <Button
                        variant="outline-primary"
                        id="clickButton"
                        onMouseUp={() => setIsPressed(false)}
                        onMouseDown={() => setIsPressed(true)}
                    >
                        Click here
                    </Button>
                </Col>
            </Row>
            <Row className='mt-3 d-flex justify-content-center'>
                <Col xs={2} className='fs-2'>
                    Click time:
                </Col>
                <Col xs={3}>
                    <Alert variant={isLongClick ? 'success' : "danger"}>
                        {clickPressCounter}s {isLongClick ? "Long click" : "Not long click"}
                    </Alert>
                </Col>
            </Row>
        </Layout>
    );
}

export default LongClick;
