import React, { useState } from 'react';
import { Container, Row, Col, Button, Collapse, Form, InputGroup, Alert } from 'react-bootstrap';
import Prompt from '../components/Prompt.jsx'
import Demo from '../components/Demo.jsx';
import { Link } from 'react-router-dom';


const VerifyCode = () => {
    const [codeRequested, setCodeRequested] = useState(false);
    const [code, setCode] = useState('0000');
    const [inputCode, setInputCode] = useState('');
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        message: '',
        variant: 'danger'
    });

    const handleCodeRequest = () => {
        setCodeRequested(true);
        setAlertInfo({ show: false, message: '', variant: 'danger' });
        // Sets a random 4 digit code
        const randomCode = Math.floor(Math.random() * 9000) + 1000;
        setCode(randomCode.toString());
    }

    const handleCodeVerification = () => {
        if (inputCode === code) {
            setAlertInfo({
                show: true,
                message: 'Valid Code',
                variant: 'success'
            });
        } else {
            setAlertInfo({
                show: true,
                message: 'Invalid Code. Try again.',
                variant: 'danger'
            });
        }
    }

    return (
        <Demo>
            <Prompt title="Code Verification" instructions="Click the button below to retrieve and confirm the code." />
            <Container role="main" aria-labelledby="verify-code-title">
                <Collapse in={!codeRequested}>
                    <Row className="mt-5 justify-content-center text-center">
                        <Col>
                            <Button 
                                variant="primary btn-lg" 
                                onClick={handleCodeRequest}
                                id="request-code-btn"
                                aria-label="Request verification code"
                            >
                                Get Code
                            </Button>
                        </Col>
                    </Row>
                </Collapse>
                <Collapse 
                    in={codeRequested} 
                    className="mt-5 justify-content-center text-center"
                >
                    <div>
                        <Row>
                            <Col>
                                <div id="verification-helper">
                                    Enter the code to confirm your email:
                                </div>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={8} md={6} lg={4}>
                                        <InputGroup className="my-3" size="lg">
                                            <Form.Control
                                                id="verification-input"
                                                value={inputCode}
                                                onChange={(e) => setInputCode(e.target.value)}
                                                placeholder="Enter code here"
                                                aria-label="Verification code input"
                                                aria-describedby="verification-helper"
                                            />
                                            <Button 
                                                variant="primary" 
                                                id="verify-code-btn"
                                                onClick={handleCodeVerification}
                                                aria-label="Verify entered code"
                                            >
                                                Verify
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div id="code-display" className="text-muted" role="status" aria-live="polite">
                                    The code is: <span className="fw-bold">{code}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Collapse>
                {alertInfo.show && (
                    <Row className="mt-3 justify-content-center text-center">
                        <Col>
                            <Alert 
                                variant={alertInfo.variant}
                                onClose={() => setAlertInfo({ ...alertInfo, show: false })}
                                dismissible
                            >
                                {alertInfo.message}
                            </Alert>
                        </Col>
                    </Row>
                )}
            </Container>
        </Demo>
    );
}

export default VerifyCode;
