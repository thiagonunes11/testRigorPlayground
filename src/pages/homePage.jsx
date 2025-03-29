import React from 'react';
import { Container, Row, Col, Navbar } from "react-bootstrap"
import DemoBlock from '../components/DemoBlock.jsx';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import demos from "../store/demos.jsx"
import '../styles/homePage.css';

const HomePage = () => {
    return (
        <div className="min-vh-100 dark-theme">
            <Navbar fixed="top" className="glass-navbar">
                <Container fluid>
                    <Navbar.Brand href="/" className="mx-4">
                        <span className="gradient-text">testRigor Playground</span>
                        <span className="ms-2">🛝</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col md={8} className="mx-auto text-center">
                            <h1 className="display-4 fw-bold gradient-text mb-4">Welcome to testRigor Playground</h1>
                            <p className="lead text-light mb-4">
                                Explore our collection of interactive demos designed to help you test various web elements and interactions.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Demos Section */}
            <Container className="py-5">
                <Row className="mb-4">
                    <Col className="text-center">
                        <h2 className="display-6 fw-bold gradient-text mb-3">Interactive Demos</h2>
                        <p className="text-light-muted">Select a demo to explore different testing scenarios</p>
                    </Col>
                </Row>
                <Row className="g-4">
                    {demos.map((item, index) => (
                        <DemoBlock key={`item-${index}`} {...item} />
                    ))}
                </Row>
            </Container>

            <Footer />
        </div>
    );
};

export default HomePage;