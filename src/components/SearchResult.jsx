import { Card, Row, Col, Image, Button, Stack, Form } from "react-bootstrap"
import ocrImage from '../assets/images/OCR_TEXT.png';

function SearchResult({ id, name, value, quantity = 1, isInCart, isCartOpen, onAdd, onRemove, onQuantityChange }) {
    return(
        <Card className="mb-3 text-start">
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <Col xs={2}>
                        <Image src={ocrImage} fluid rounded className="rounded-start" alt="Product"/>
                    </Col>
                    <Col>
                        <Card.Title>
                            {name}
                        </Card.Title>
                        <h2>${value}</h2>
                        {isCartOpen && (
                            <Row className="mb-2">
                            <Col xs={2} className="text-center d-flex align-items-center">Quantity:</Col>
                            <Col xs={2}>
                                <Form.Select 
                                    value={quantity} 
                                    id={name}
                                    onChange={onQuantityChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        )}
                        {!isInCart ? (
                            <Button variant="warning" className="btn-modern btn-primary" onClick={onAdd}>
                                Add to cart
                            </Button>
                        ) : (
                            <Button variant="danger" className="btn-modern btn-secondary" onClick={onRemove}>
                                Remove from cart
                            </Button>
                        )}
                    </Col>
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default SearchResult;