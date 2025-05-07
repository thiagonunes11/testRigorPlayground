import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert
} from 'react-bootstrap';
import Layout from '../components/Layout';


function LongClick() {
    const [isPressed, setIsPressed] = useState(false);
    const [isLongClick, setIsLongClick] = useState(false);
    const [clickPressCounter, setClickPressCounter] = useState(0);
    const [chosenClickTime, setChosenClickTime] = useState(1);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        let interval;
        let localStartTime = null;

        if (isPressed) {
            localStartTime = Date.now();
            setClickPressCounter(0);
            setIsLongClick(false);

            interval = setInterval(() => {
                const elapsed = (Date.now() - localStartTime) / 1000;
                setClickPressCounter(elapsed.toFixed(2));
            }, 10);
        } else {
            clearInterval(interval);
            if (startTime) {
                setIsLongClick(clickPressCounter >= chosenClickTime);
            }
        }

        return () => clearInterval(interval);
    }, [isPressed]);

    const handlePressStart = () => {
        setIsPressed(true);
        setStartTime(Date.now());
    };

    const handlePressEnd = () => {
        setIsPressed(false);
    };

    return (
        <Layout
            title="Long Click"
            description="The button below will say if it was clicked by a long click or a normal click depending on the setting."
        >
            <Container className="mt-4">
                {/* Time Selection Row */}
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={8} lg={6}>
                        <Form>
                            <Form.Group as={Row} controlId="clickTimeSelect">
                                <Form.Label column xs={12} sm={6} md={5} className="text-sm-end mb-2 mb-sm-0">
                                    Select long click duration (seconds):
                                </Form.Label>
                                <Col xs={12} sm={6} md={4}>
                                    <Form.Select
                                        value={chosenClickTime}
                                        onChange={(e) => setChosenClickTime(Number(e.target.value))}
                                        aria-label="Select long click duration"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {/* Click Button Row */}
                <Row className="justify-content-center mb-4">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <div className="d-grid">
                            <Button
                                className={'btn-modern'}
                                size="lg"
                                onMouseDown={handlePressStart}
                                onMouseUp={handlePressEnd}
                                onMouseLeave={handlePressEnd}
                                onTouchStart={handlePressStart}
                                onTouchEnd={handlePressEnd}
                            >
                                {isPressed ? `Holding... ${clickPressCounter}s` : "Click here"}
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Result Display Row */}
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                            <div className="fs-4 text-nowrap">Click time:</div>
                            <Alert
                                variant={isLongClick ? 'success' : clickPressCounter > 0 ? 'danger' : 'secondary'}
                                className="m-0 text-center flex-grow-1"
                            >
                                {clickPressCounter > 0 ? (
                                    <><strong>{clickPressCounter}s</strong> - {isLongClick ? `Long click (threshold: ${chosenClickTime}s)` : `Normal click (threshold: ${chosenClickTime}s)`}</>
                                ) : (
                                    `Press and hold (threshold: ${chosenClickTime}s)`
                                )}
                            </Alert>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default LongClick;