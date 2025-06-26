import React, { useState } from 'react';
import QRCode from 'qrcode';
import Layout from '../components/Layout';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const QRCodePage = () => {
    const [text, setText] = useState('');
    const [qrValue, setQRValue] = useState('');
    const [qrImg, setQrImg] = useState('');

    const handleGenerate = async () => {
        setQRValue(text);
        if (text) {
            const url = await QRCode.toDataURL(text, { width: 256, margin: 2 });
            setQrImg(url);
        } else {
            setQrImg('');
        }
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
                                {qrImg && (
                                    <div className="text-center mt-4">
                                        <span>Your QR Code:</span>
                                        <div
                                            className="d-flex justify-content-center mt-2"
                                            style={{ minWidth: 256, minHeight: 256, overflowX: 'auto' }}
                                        >
                                            <img
                                                id="qr-code"
                                                src={qrImg}
                                                alt="QR Code"
                                                width={256}
                                                height={256}
                                                style={{ imageRendering: 'pixelated' }}
                                            />
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
