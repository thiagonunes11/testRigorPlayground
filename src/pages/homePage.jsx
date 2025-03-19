import React, { useState } from 'react';
import { Container, Row, Col, Navbar } from "react-bootstrap"

import DemoBlock from '../components/DemoBlock.jsx';

import Footer from '../components/Footer';
//import Header from './Header'
import Sidebar from '../components/Sidebar';
import demos from "../store/demos.jsx"

const HomePage = () => {
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/" className="mx-4">testRigor Playground 🛝</Navbar.Brand>
                </Container>
            </Navbar>

            <Container className="vh-100 py-5 mb-4">
                <Row>
                    <Col className="text-center mt-4">
                        <h2>Demos</h2>
                    </Col>
                </Row>
                <Row className='mb-sm-4 mx-3'>
                    {demos.map((item, index) => (
                        <DemoBlock key={`item-${index}`} {...item} />
                    ))}
                </Row>
                <div style={{height: "3rem"}}></div>
            </Container>

            <Footer />
        </div >
    );
};

export default HomePage;