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


const BUTTON_LABEL = 'Click here';
const buttons = ['button1', 'button2', 'button3'];

function LongClick() {
    const [isPressed, setIsPressed] = useState(false);
    const [isLongClick, setIsLongClick] = useState(false);
    const [clickPressCounter, setClickPressCounter] = useState(0);
    const [chosenClickTime, setChosenClickTime] = useState(1);
    const [startTime, setStartTime] = useState(null);
    const [clickedButton, setClickedButton] = useState(null);

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

    const handlePressStart = (buttonId) => {
        setClickedButton(buttonId);
        setIsPressed(true);
        setStartTime(Date.now());
    };

    const handlePressEnd = () => {
        setIsPressed(false);
    };

    const getButtonLabel = (buttonId) => {
        const index = buttons.indexOf(buttonId);
        return index >= 0 ? `Button ${index + 1}` : buttonId;
    };

    const getResultMessage = () => {
        if (clickPressCounter <= 0) {
            return `Press and hold a button for at least ${chosenClickTime} second${chosenClickTime === 1 ? '' : 's'}.`;
        }

        const buttonLabel = getButtonLabel(clickedButton);

        if (isLongClick) {
            return `${buttonLabel}: long click! You held for ${clickPressCounter}s.`;
        }

        return `${buttonLabel}: quick press. You held for ${clickPressCounter}s.`;
    };

    return (
        <Layout
            title="Long Click"
            description="The button below will say if it was clicked by a long click or a normal click depending on the setting."
        >
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={5} className="d-flex flex-column gap-4">
                        <Form.Group controlId="clickTimeSelect">
                            <Form.Label className="text-center d-block mb-2">
                                Select long click duration (seconds):
                            </Form.Label>
                            <Form.Select
                                value={chosenClickTime}
                                onChange={(e) => setChosenClickTime(Number(e.target.value))}
                                aria-label="Select long click duration"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className="d-grid gap-3">
                            {buttons.map((buttonId) => (
                                <Button
                                    key={buttonId}
                                    className={'btn-modern'}
                                    size="lg"
                                    onMouseDown={() => handlePressStart(buttonId)}
                                    onMouseUp={handlePressEnd}
                                    onMouseLeave={handlePressEnd}
                                    onTouchStart={() => handlePressStart(buttonId)}
                                    onTouchEnd={handlePressEnd}
                                >
                                    {isPressed && clickedButton === buttonId
                                        ? `Keep holding... ${clickPressCounter}s`
                                        : BUTTON_LABEL}
                                </Button>
                            ))}
                        </div>

                        <div>
                            <div className="fs-5 text-center mb-2">Click time:</div>
                            <Alert
                                variant={isLongClick ? 'success' : clickPressCounter > 0 ? 'danger' : 'secondary'}
                                className="m-0 text-center"
                            >
                                {getResultMessage()}
                            </Alert>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default LongClick;