import React, { } from 'react';
import Prompt from '../components/Prompt.jsx'
import Demo from "../components/Demo.jsx";
import { Row, Col } from 'react-bootstrap';

function ScrollDown() {
    return (
        <Demo>
            <Prompt title="Scroll Down" instructions="Scroll down in order to find the desired fruit name." />

            <Row className="my-5 py-5">
                <Col>
                    <p>The first fruit is pineapple.</p>
                </Col>
            </Row>
            <Row className="my-5 py-5"><Col></Col></Row>

            <Row className="my-5 py-5">
                <Col>
                    <p>The second fruit is guarana.</p>
                </Col>
            </Row>
            <Row className="my-5 py-5"><Col></Col></Row>

            <Row className="my-5 py-5">
                <Col>
                    <p>The third fruit is cashew.</p>
                </Col>
            </Row>
            <Row className="my-5 py-5"><Col></Col></Row>

            <Row className="my-5 py-5">
                <Col>
                    <p>the forth fruit is passion fruit.</p>
                </Col>
            </Row>
            <Row className="my-5 py-5"><Col></Col></Row>

            <Row className="my-5 py-5">
                <Col>
                    <p>The fifth fruit is pitanga.</p>
                </Col>
            </Row>
            <Row className="my-5 py-5"><Col></Col></Row>

            <Row className="my-5 py-5">
                <Col>
                    <p>And the sixth and final fruit is jabuticaba.</p>
                </Col>
            </Row>
        </Demo>
    );
}

export default ScrollDown;
