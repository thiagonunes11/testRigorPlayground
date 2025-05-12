import React, { useState } from "react";
import Layout from '../components/Layout';
import { Container, Row, Col, Button, Card, Nav, InputGroup, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function SimilarPages() {
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
                <Nav.Link href="#" disabled>First version</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/similarPages/secondVersion">
                  Second version
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Check by the author</Card.Title>
            <Card.Text>
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
                  aria-describedby="searchButton"
              />
              <Button 
                variant="primary" 
                onClick={handleSearch} 
                id="searchButton" >
                  Search
              </Button>
          </InputGroup>

          {showResult && (
            <Row className="mt-4">
              <Col>
                <Alert key='success' variant='success' id="resultMessage">
                  A book by <span id="authorName">{author}</span> was found!
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

export default SimilarPages;
