import Layout from '../components/Layout';
import { Collapse, Alert, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function WaitMessage() {
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        if (secondsLeft <= 0)
            return;

        const interval = setInterval(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [secondsLeft]);

    return (
        <Layout title="Wait for the Message" description="In five seconds, the message will appear.">

            <Row className="mt-5">
                <Col className="">
                    <p className="fs-3">
                        The secret message will appear in {secondsLeft}...
                    </p>
                    <Collapse in={secondsLeft === 0}>
                        <div>
                            <Alert variant="success">The secret message is: <strong>banana</strong></Alert>
                        </div>
                    </Collapse>
                </Col>
            </Row>
        </Layout>
    );
}

export default WaitMessage;
