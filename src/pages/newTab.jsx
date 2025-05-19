import { Row, Col, Container } from "react-bootstrap";
import Layout from '../components/Layout';

function NewTab() {
    return (
        <Layout
            title="Open new tab"
            description="Clicking the link or the button will open a new tab."
        >
            <Container>
                <Row
                    className="d-flex justify-content-center align-items-center"
                >
                    <Col className="text-center">
                        Hello! This is a page that was opened in a new tab.
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default NewTab;