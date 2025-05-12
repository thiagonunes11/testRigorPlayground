import React, { useState } from "react";
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Card, Nav, InputGroup, Form, Alert } from 'react-bootstrap';


function SecondVersion() {
  const [author, setAuthor] = useState("");
  const [_author, set_Author] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (_author.trim() !== ""){
      setAuthor(_author);
      setShowResult(true);
    }
    else {
      setShowResult(false);
    }
  };

  return (
    <Layout
      title="Similar Pages"
      description="There are two nearly identical pages that differ only in tags or attributes."
    >
      <Container className="demo-content mt-5">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#">
              <Nav.Item>
                <Nav.Link href="/similarPages">First version</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" disabled>
                  Second version
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Check by the author</Card.Title>
            <Card.Text title="Enter the name into the field!">
              Here you can check if our library has a book by the author's name.
            </Card.Text>
            <InputGroup>
              <Form.Control
                type="search"
                role="search"
                autoComplete="off"
                placeholder="Author's name"
                onChange={(e) => set_Author(e.target.value)}
                aria-label="Author's name"
              />
              <Button
                variant="primary" 
                onClick={handleSearch} 
                data-qa="search-button">
                  Search
              </Button>
          </InputGroup>

          {showResult && (
            <Row className="mt-4">
              <Col>
                <Alert key='success' variant='success' id="searchMessage">
                  A book by <span id="author">{author}</span> was found!
                </Alert>
              </Col>
            </Row>
          )}
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default SecondVersion;
