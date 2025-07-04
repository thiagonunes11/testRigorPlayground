import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
const MouseHover = () => {
    const [isHovering, setIsHovering] = useState(false);

    const toggleTextVisibility = () => {
        setIsHovering(!isHovering);
    }

    return (
        <Layout
            title="Mouse hover"
            description="Hover the mouse over the container to reveal the hidden text."
        >
            <Container>
                <Row className="mt-5 justify-content-center text-center">
                    <Col>
                        <Button className={"btn-modern"} variant="primary" onMouseOver={toggleTextVisibility} onMouseLeave={toggleTextVisibility}>
                            Hover here
                        </Button>
                    </Col>
                </Row>
                {isHovering && (
                    <Row className="mt-4 justify-content-center text-center">
                        <Col>
                            <p>This text is now visible!</p>
                        </Col>
                    </Row>
                )}
            </Container>
        </Layout>
    );
};

export default MouseHover;
