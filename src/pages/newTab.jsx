import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Prompt from '../components/Prompt.jsx';
import Demo from "../components/Demo.jsx";
import { Link } from "react-router-dom";

function NewTab() {
    return (
        <Demo>
            <Prompt title="Open new tab" instructions="Click the link that will open a new tab."/>
            
            <Container>
                <Row className="mt-5">
                    <Col xs={12}>
                        Hello! This is a page that was opened in a new tab.
                    </Col>
                </Row>
            </Container>
        </Demo>
    );
}

export default NewTab;