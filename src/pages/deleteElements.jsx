import React, { useState } from "react";
import { Container, Row, Col, Card, Form, ListGroup, Button, Alert } from "react-bootstrap";
import Layout from '../components/Layout';


const DeleteElements = () => {
    const [items, setItems] = useState(["Element 1", "Element 2", "Element 3"]);
    const [inputValue, setInputValue] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleAddItem = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setItems([...items, inputValue.trim()]);
            setInputValue("");
            setShowAlert(false);
        } else if (event.key === "Enter") {
            setShowAlert(true);
        }
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <Layout
            title="Delete Elements" 
            description="Delete elements by clicking on the buttons and add new elements by inputting text."
        >
            <Row className="demo-content justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            {/* Input Section */}
                            <Form.Group controlId="elementInput" className="mb-4">
                                <Form.Label>
                                    Type the new element's desired text below:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Element name"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyUp={handleAddItem}
                                    className="mb-2"
                                />
                                <Form.Text className="text-muted">
                                    Press the "enter" key to add the new element.
                                </Form.Text>
                                {showAlert && (
                                    <Alert variant="warning" className="mt-2" onClose={() => setShowAlert(false)} dismissible>
                                        Please enter a valid element name.
                                    </Alert>
                                )}
                            </Form.Group>

                            {/* List Section */}
                            <ListGroup as="ol" numbered>
                                {items.map((item, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        as="li"
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {item}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => handleDeleteItem(index)}
                                            aria-label={`Delete ${item}`}
                                        />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            {items.length === 0 && (
                                <Alert variant="info" className="mt-3">
                                    No elements to display. Add some using the input above.
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};

export default DeleteElements;