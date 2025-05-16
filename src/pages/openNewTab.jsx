import Layout from '../components/Layout';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

function OpenNewTab() {
    return (
        <Layout
            title="Open new tab"
            description="Clicking the link or the button will open a new tab."
        >
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs="auto" className="text-center">
                        <Link to="/newTab" target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" className="mb-3">Open new tab</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default OpenNewTab;