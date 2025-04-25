import React from 'react';
import Prompt from '../components/Prompt';
import Layout from '../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';


const CheckboxPage = () => {
    return (
        <Layout
            title={"Checkbox"}
            description={"Click on checkboxes in order to select the desired option."}
        >
            <Container style={{ padding: '80px' }}>
                <Row className="justify-content-center">
                    {/* First Box */}
                    <Col md={4} className="border rounded p-4 mx-2">
                        <h4>Checkboxes with Labels</h4>
                        <div>
                            <div>
                                <label>
                                    <input type="checkbox" name="first" /> First
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="second" /> Second
                                </label>
                            </div>
                        </div>
                    </Col>

                    {/* Second Box */}
                    <Col md={4} className="border rounded p-4 mx-2 checkbox-section">
                        <h4>Checkboxes with Numbers</h4>
                        <div>
                            <label>
                                <input type="checkbox" name="one" /> 1
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="two" /> 2
                            </label>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CheckboxPage;