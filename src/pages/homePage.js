import React, { useState } from 'react';
import { Container, Row, Col, Navbar } from "react-bootstrap"

import DemoBlock from '../components/DemoBlock.js';

import Footer from '../components//Footer';
//import Header from './Header'
import Sidebar from '../components/Sidebar';

const HomePage = () => {
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/" className="mx-4">testRigor Playground 🛝</Navbar.Brand>
                </Container>
            </Navbar>

            <Container className="vh-100 py-5">
                <Row>
                    <Col class="text-center mt-4">
                        <h2>Demos</h2>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <DemoBlock title="Dropdowns" instructions="Interact with different dropdowns and observe the changes" to="/dropdowns" />
                    <DemoBlock title="Relative Position Table" instructions="Answer the questions to move to the next page" to="/tableRelativePosition" />
                    <DemoBlock title="Dynamic Table" instructions="The rows of the table below changes order every time the page is refreshed" to="/dynamicTable" />
                </Row>
                <Row className="mt-4">
                    <DemoBlock title="Wait for the Message" instructions="In five seconds, the message will appear" to="/waitMessage" />
                    <DemoBlock title="Shopping Cart" instructions="Search for a random item. This will display items you can press to add to cart." to="/shoppingCart" />
                </Row>
            </Container>

            <Footer />
        </div >
    );
};

export default HomePage;