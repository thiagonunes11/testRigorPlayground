import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Layout from '../components/Layout';


function NewTab() {
    return (
        <Layout
            title="Open new tab"
            description="Click the link that will open a new tab."
        >
            <Container>
                <Row className="mt-5">
                    <Col xs={12}>
                        Hello! This is a page that was opened in a new tab.
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default NewTab;