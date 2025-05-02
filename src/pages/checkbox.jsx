import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const CheckboxPage = () => {
    return (
        <Layout
            title="Checkbox" 
            description="Click on checkboxes in order to select the desired option."
        >
            <div className="demo-content">
                <Container className="my-4">
                    <Row className="justify-content-center">
                        {/* First Box */}
                        <Col md={6} lg={5} className="mb-4 mb-lg-0">
                            <Card>
                                <Card.Body>
                                    <Card.Title as="h3">Checkboxes with Labels</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Check 
                                                type="checkbox"
                                                id="first-checkbox"
                                                label="First"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Check 
                                                type="checkbox"
                                                id="second-checkbox"
                                                label="Second"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Second Box */}
                        <Col md={6} lg={5}>
                            <Card>
                                <Card.Body>
                                    <Card.Title as="h3">Checkboxes with Numbers</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Check 
                                                type="checkbox"
                                                id="one-checkbox"
                                                label="1"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Check 
                                                type="checkbox"
                                                id="two-checkbox"
                                                label="2"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default CheckboxPage;