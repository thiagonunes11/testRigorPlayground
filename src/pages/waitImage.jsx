import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ocrImage from '../../src/assets/images/OCR_TEXT.png';
import { Container, Row, Col } from 'react-bootstrap';


const WaitImage = () => {
    const [counter, setCounter] = useState(5);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (counter === 0) {
            setShowImage(true);
            return;
        }
        const timer = setTimeout(() => {
            setCounter(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    return (
        <Layout
            title="Wait for the Image"
            description="In five seconds, the image will appear."
        >
            <Container className="mt-5 text-center">
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <h3>
                            The secret image will appear in {counter}...
                        </h3>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={4}>
                        {showImage && (
                            <img
                                src={ocrImage}
                                alt="OCR Text Example"
                                className="img-fluid"
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default WaitImage;