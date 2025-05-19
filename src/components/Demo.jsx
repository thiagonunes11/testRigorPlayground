import {Container, Row, Col, Navbar} from "react-bootstrap"
import Footer from './Footer';
//import Header from './Header'
import Sidebar from './Sidebar';
import '../styles/demo.css';

function Demo({ children }) {
    return (
        <div className="demo-container">
            <Navbar fixed="top" className="glass-navbar">
                <Container fluid>
                    <Navbar.Brand href="/" className="mx-4">
                        <span className="gradient-text">testRigor Playground</span>
                        <span className="ms-2">🛝</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container fluid className="pt-5 pb-5">
                <Row className="h-100 pb-4">
                    <Col className="main-content">
                        <main className="container">
                            {children}
                        </main>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default Demo;