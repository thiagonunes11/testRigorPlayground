import React, { useState } from 'react';
import { Container, Row, Col, Navbar } from "react-bootstrap"

import DemoBlock from '../components/DemoBlock.jsx';

import Footer from '../components/Footer';
//import Header from './Header'
import Sidebar from '../components/Sidebar';
import demos from "../store/demos.jsx"

const HomePage = () => {
    function getDemos() {
        // Render the demos in groups of three inside <Row/> components
        const rows = [];

        for (let i = 0; i < demos.length; i += 3) {
            const row = (
                <Row className='mt-4 mb-4'>
                    {demos.slice(i, i + 3).map((item, index) => (
                        <DemoBlock key={`item-${i}-${index}`} {...item} />
                    ))}
                </Row>
            );
            rows.push(row);
        }
        return rows;
    }

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
                {getDemos()}
                <div style={{height: "3rem"}}></div>
            </Container>

            <Footer />
        </div >
    );
};

export default HomePage;