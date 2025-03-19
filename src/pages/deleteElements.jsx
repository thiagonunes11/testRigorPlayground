import React, { useState } from 'react';
import { Container, Row, Col, CloseButton, Alert } from 'react-bootstrap';
import Prompt from '../components/Prompt.jsx'
import Demo from '../components/Demo.jsx';
import Form from 'react-bootstrap/Form';

const DeleteElements = () => {
    const [currentText, setCurrentText] = useState("");
    const [elements, setElements] = useState(["Element 1", "Element 2", "Element 3"]);

    const removeElement = (index) => {
        setElements(prevElements => prevElements.filter((_, i) => i !== index));
    }

    const onInputHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Avoids refreshing the page
            console.log("Elementos: ", elements)
            setElements(oldArray => [...oldArray, currentText]);
            setCurrentText("");
        }
    }

    const onChangeHandler = (e) => {
        setCurrentText(e.target.value)
    }

    return (
        <Demo>
            <Prompt
                title="Delete Elements"
                instructions={`Delete elements by clicking on the "x" buttons besides them and add new elements by inputting a text on the field.`}
            />
            <Container>
                <Row className="mt-5 justify-content-center">
                    <Col xs={9}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Type the new element's desired text below:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Element name"
                                    aria-describedby="elementNameHelpBlock"
                                    value={currentText}
                                    onChange={onChangeHandler}
                                    onKeyDown={onInputHandler}
                                />
                                <Form.Text id="elementNameHelpBlock" muted>
                                    Press the "enter" key to add the new element.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={6}>
                        {elements.map((el, index) => (
                            <Alert key={index} variant="secondary" >
                                <Row>
                                    <Col>
                                        <span>{el}</span>
                                    </Col>
                                    <Col xs={2} >
                                        <CloseButton className='align-middle' onClick={() => removeElement(index)} />
                                    </Col>
                                </Row>
                            </Alert>
                        ))}
                    </Col>
                </Row>
            </Container>
        </Demo>
    );
};

export default DeleteElements;
