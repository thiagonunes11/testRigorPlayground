import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';

const buttons = ['button1', 'button2', 'button3'];

const MouseHover = () => {
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleMouseEnter = (buttonId) => {
        setHoveredButton(buttonId);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const getButtonLabel = (buttonId) => {
        const index = buttons.indexOf(buttonId);
        return index >= 0 ? `Button ${index + 1}` : buttonId;
    };

    return (
        <Layout
            title="Mouse hover"
            description="Hover the mouse over a button to reveal the hidden text."
        >
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={5} className="d-flex flex-column gap-4">
                        <div className="d-grid gap-3">
                            {buttons.map((buttonId) => (
                                <Button
                                    key={buttonId}
                                    className="btn-modern"
                                    variant="primary"
                                    size="lg"
                                    onMouseEnter={() => handleMouseEnter(buttonId)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Hover here
                                </Button>
                            ))}
                        </div>

                        <div>
                            <div className="fs-5 text-center mb-2">Hidden text:</div>
                            <Alert
                                variant={hoveredButton ? 'success' : 'secondary'}
                                className="m-0 text-center"
                            >
                                {hoveredButton
                                    ? `${getButtonLabel(hoveredButton)}: This text is now visible!`
                                    : 'Hover over a button to reveal the text.'}
                            </Alert>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default MouseHover;
