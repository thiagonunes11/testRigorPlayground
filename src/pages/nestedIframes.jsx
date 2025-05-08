import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FirstIframe from './nestedIframes/firstIframe'; // Import the FirstIframe component
import Layout from '../components/Layout';



const NestedIframes = () => {
  return (
    <Layout
      title={"Nested Iframes"}
      description={"There are two iframes, one inside another. Both of them have a unique word that is a link. This link changes the iframe url, changing also the text."}
    >
      <Container className="mt-5 mb-3">
        

        <Row className="mt-5">
          <Col xs={12}>
            <h3>Out of iframe</h3>
            <p>This first test is present on the current page, outside of any iframe.</p>

            {/* Responsive iframe container */}
            <div className="ratio ratio-16x9">
              <iframe 
                src="http://localhost:5173/nestedIframes/firstIframe" 
                allowFullScreen
                title="Nested Iframes Demo"
              >
              </iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NestedIframes;