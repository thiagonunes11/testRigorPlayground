import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';

const NestedIframes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout
      title={"Nested Iframes"}
      description={"There are two iframes, one inside another. Both of them have a unique word that is a link."}
    >
      <Container className="vh-100 d-flex flex-column p-0" fluid>
        <Row className="flex-grow-1 m-0">
          <Col xs={12} className="h-100 p-4">
            <h3>Out of iframe</h3>
            <p>This first test is present on the current page, outside of any iframe.</p>

            {/* Responsive iframe container - now filling available space */}
            <div className="ratio ratio-16x9 h-75">
              <iframe 
                src="/nestedIframes/firstIframe" 
                allowFullScreen
                title="Nested Iframes Demo"
                className="h-100"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NestedIframes;