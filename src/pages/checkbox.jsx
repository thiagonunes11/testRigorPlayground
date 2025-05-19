import React from 'react';
import Layout from '../components/Layout';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import '../styles/checkboxPage.css'; 

const CheckboxPage = () => {
    const checkboxGroups = [
        {
            title: "Select Your Preferences",
            options: [
                { id: "first-checkbox", label: "First" },
                { id: "second-checkbox", label: "Second" },
            ],
        },
        {
            title: "Choose Your Numbers",
            options: [
                { id: "one-checkbox", label: "1" },
                { id: "two-checkbox", label: "2" },
            ],
        },
    ];

    return (
        <Layout
            title="Checkbox Page"
            description="Click on checkboxes in order to select the desired option"
        >
            <div className="demo-content">
                <Container className="my-5">
                    <Row className="justify-content-center">
                        {checkboxGroups.map((group, index) => (
                            <Col key={index} md={6} lg={5} className="mb-4">
                                <Card className="shadow-sm border-0">
                                    <Card.Body>
                                        <Card.Title as="h4" className="text-primary mb-4">
                                            {group.title}
                                        </Card.Title>
                                        <Form>
                                            {group.options.map(option => (
                                                <Form.Group key={option.id} className="mb-3">
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={option.id}
                                                        label={option.label}
                                                        className="custom-checkbox"
                                                    />
                                                </Form.Group>
                                            ))}
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default CheckboxPage;