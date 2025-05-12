import React, { useState } from "react";
import Layout from '../components/Layout';
import { Row, Col, Button, Container } from 'react-bootstrap';


function RightClick() {
  const [buttonText, setButtonText] = useState("Right click here");
  const [buttonClass, setButtonClass] = useState("btn-modern btn-primary");

  const handleRightClick = (event) => {
    event.preventDefault();
    setButtonText("The button was right clicked");
    setButtonClass("btn-modern btn-secondary");
  };

  return (
    <Layout
      title="Right click"
      description="The button below will change itself on a mouse right click."
    >
        <Container className='demo-content justify-content-center'>
            <Row>
                <Col>
                    <Button className={buttonClass} onContextMenu={handleRightClick}>
                        {buttonText}
                    </Button>
                </Col>
            </Row>
        </Container>
    </Layout>
  );
}

export default RightClick;