import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Prompt from '../components/Prompt.js'
import Demo from '../components/Demo.js';

const MouseHover = () => {
    const [isHovering, setIsHovering] = useState(false);

    const toggleTextVisibility = () => {
        setIsHovering(!isHovering);
    }
  
    return (
        <Demo>
            <Prompt title="Mouse hover" instructions="Hover the mouse over the container to reveal the hidden text." />
            <Container>
                <Row className="mt-5 justify-content-center text-center">
                    <Col>
                        <Button variant="primary" onMouseOver={toggleTextVisibility} onMouseLeave={toggleTextVisibility}>
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
        </Demo>
    );
};

export default MouseHover;
