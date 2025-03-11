import {Container, Row, Col, Navbar} from "react-bootstrap"

import Footer from './Footer';
//import Header from './Header'
import Sidebar from './Sidebar';

function Demo({ children }) {
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/" className="mx-4">testRigor Playground 🛝</Navbar.Brand>
                </Container>
            </Navbar>

            <Container fluid className="vh-100 pt-5 pb-5">
                <Row className="h-100 pb-4">
                    <Col className="bg-white main">
                        <main className="container mt-5 text-center">
                            {children}
                        </main>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div >
    )
}

export default Demo;