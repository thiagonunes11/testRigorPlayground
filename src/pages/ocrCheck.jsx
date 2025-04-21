import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Prompt from '../components/Prompt.jsx'
import Demo from '../components/Demo.jsx';

import ocrImage from '../assets/images/OCR_TEXT.png';

const OcrCheck = () => {
    return (
        <Layout
            title="OCR Check"
            description="Use OCR to check for the content of the page."
        >
            <Container>
                <Row className="mt-5 justify-content-center text-center">
                    <Col>
                        <img
                            src={ocrImage}
                            alt="OCR Text Example"
                            style={{ maxWidth: '50%', height: 'auto' }}
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default OcrCheck;