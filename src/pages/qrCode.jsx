import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Layout from '../components/Layout';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const QRCodePage = () => {
    const [text, setText] = useState('');
    const [qrValue, setQRValue] = useState('');

    const handleGenerate = () => {
        setQRValue(text);
        setText('');
    };

    return (
        <Layout
            title="QR Code"
            description="Enter some text and click the Generate button to create your QR Code."
        >
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="qrText">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        className="mt-3"
                                        onClick={handleGenerate}
                                    >
                                        Generate
                                    </Button>
                                </Form>
                                {qrValue && (
                                    <div className="text-center mt-4">
                                        <span>Your QR Code:</span>
                                        <div className="d-flex justify-content-center mt-2">
                                            <QRCodeSVG id="qr-code" value={qrValue} size={256} />
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default QRCodePage;
