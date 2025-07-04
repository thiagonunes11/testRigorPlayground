import React from "react";
import Layout from '../components/Layout';
import { Row, Col, Container } from 'react-bootstrap';


const ScrollDown = () => {
  return (
    <Layout
      title="Scroll Down"
      description="Scroll down in order to find the desired fruit name."
    >
      {/* Fruit List with Scroll */}
      <Container className='demo-content justify-content-center'>
          <Row className="m-4">
              <Col className="p-3">
                  <p>The first fruit is pineapple.</p>
                  <div style={{ height: "100vh" }}></div>
                  <p>The second fruit is guarana.</p>
                  <div style={{ height: "100vh" }}></div>
                  <p>The third fruit is cashew.</p>
                  <div style={{ height: "100vh" }}></div>
                  <p>The fourth fruit is passion fruit.</p>
                  <div style={{ height: "100vh" }}></div>
                  <p>The fifth fruit is pitanga.</p>
                  <div style={{ height: "100vh" }}></div>
                  <p>And the sixth and final fruit is jabuticaba.</p>
              </Col>
          </Row>
      </Container>
    </Layout>
  );
};

export default ScrollDown;
