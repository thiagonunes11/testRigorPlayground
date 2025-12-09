import Layout from '../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';

const IndexTesting = () => {

    return (
        <Layout
            title="Index Testing"
            description="A complete index testing demonstration. Use relative locators, contexts, and other techniques to test the index of elements."
        >
            <Container >
                <h3 className="mt-4 text-center">Only text:</h3>
                <Container className="bg-light text-white py-3 rounded border border-3 border-secondary w-50" aria-label="Container">
                    <Row className="g-3">
                        {[...Array(8)].map((_, index) => (
                            <Col key={index} className="col-auto text-center">
                                <div className="bg-secondary rounded p-4">
                                    Hello
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <h3 className="mt-4 text-center">Buttons:</h3>
                <Container className="bg-light text-white py-3 rounded border border-3 border-secondary w-50" aria-label="Container">
                    <Row className="g-3">
                        {[...Array(8)].map((_, index) => (
                            <Col key={index} className="col-auto text-center">
                                <Button className="btn-modern btn-secondary rounded p-4">
                                    Hello
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <h3 className="mt-4 text-center">With invisible text:</h3>
                <Container className="bg-light text-white py-3 rounded border border-3 border-secondary w-50" aria-label="Container">
                    <Row className="g-3">
                        {[...Array(8)].map((_, index) => (
                            <Col key={index} className="col-auto text-center">
                                <div className="bg-secondary rounded p-4">
                                    <p className={`m-0 ${index % 2 === 0 ? 'visible' : 'invisible'}`}>Hello</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
        </Layout>
    );
};

export default IndexTesting;
