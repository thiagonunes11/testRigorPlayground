import React from "react";
import Layout from '../components/Layout';
import { Row, Col, Container } from 'react-bootstrap';


const ScrollSideways = () => {
  return (
    <Layout
      title="Scroll Sideways"
      description="Scroll horizontally in order to find the desired vegetable name."
    >
      {/* Vegetable List with Horizontal Scroll */}
      <Container className='demo-content justify-content-center'>
          <Row className="m-4">
              <Col className="p-3" style={{ overflowX: 'auto' }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    whiteSpace: 'nowrap',
                    width: 'max-content'
                  }}>
                    <p style={{ width: '100vw', display: 'inline-block', flexShrink: 0 }}>
                      The first vegetable is carrot.
                    </p>
                    <p style={{ width: '100vw', display: 'inline-block', flexShrink: 0 }}>
                      The second vegetable is broccoli.
                    </p>
                    <p style={{ width: '100vw', display: 'inline-block', flexShrink: 0 }}>
                      The third vegetable is spinach.
                    </p>
                    <p style={{ width: '100vw', display: 'inline-block', flexShrink: 0 }}>
                      The fourth vegetable is zucchini.
                    </p>
                    <p style={{ width: '100vw', display: 'inline-block', flexShrink: 0 }}>
                      The fifth vegetable is eggplant.
                    </p>
                    <p style={{ display: 'inline-block', flexShrink: 0, paddingRight: '20px' }}>
                      And the sixth and final vegetable is bell pepper.
                    </p>
                  </div>
              </Col>
          </Row>
      </Container>
    </Layout>
  );
};

export default ScrollSideways;