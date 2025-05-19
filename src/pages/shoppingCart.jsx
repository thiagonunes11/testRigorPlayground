import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Collapse, Badge } from 'react-bootstrap';
import { Search, Cart, ArrowLeft } from 'react-bootstrap-icons';
import Layout from '../components/Layout';
import SearchResult from '../components/SearchResult.jsx';

const generateRandomPrice = () => {
    const price = Math.random() * 990 + 10; // Between 10 and 1000
    return price.toFixed(2);
};

const generateSearchResults = (searchTerm) => {
    if (!searchTerm) return [];

    return [
        {
            title: `The Best ${searchTerm} Ever Made`,
            value: generateRandomPrice(),
            quantity: 1
        },
        {
            title: `${searchTerm} #2 you NEED this one!`,
            value: generateRandomPrice(),
            quantity: 1
        },
        {
            title: `${searchTerm} - You Won't Believe This One!`,
            value: generateRandomPrice(),
            quantity: 1
        }
    ];
};

const ShoppingCart = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        setSearchQuery(inputValue);
        setSearchResults(generateSearchResults(inputValue));
    };

    const handleAddToCart = (item) => {
        // Verifies if the item is already in the cart
        if (!cartItems.some(cartItem => cartItem.title === item.title)) {
            setCartItems([...cartItems, item]);
        }
    };

    const handleRemoveFromCart = (itemTitle) => {
        setCartItems(cartItems.filter(item => item.title !== itemTitle));
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setCartItems(
            cartItems.map(item => ({
                ...item,
                quantity: item.title === e.target.id ? newQuantity : item.quantity
            }))
        );
    }

    useEffect(() => {
        setSubtotal(cartItems.reduce((total, item) => total + parseFloat(item.value) * parseFloat(item.quantity), 0).toFixed(2));
    }, [cartItems]);

    return (
        <Layout
            title="Shopping Cart"
            description={"Search for a random item. This will display items you can press to add to cart."}
        >
            <Container className='demo-content' style={{ maxWidth: 'none' }}>
                <Row className="mt-4 align-items-center">
                    {showCart ? (
                        <Col xs={12} className="text-start mb-3">
                            <Button variant="primary" className="btn-modern btn-primary" id="button-cart" onClick={() => setShowCart(!showCart)}>
                                <ArrowLeft /> Back to search
                            </Button>
                        </Col>
                    ) : (
                        <>
                        <Col md={10} xs={8}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="search"
                                    role="search"
                                    autoComplete="off"
                                    placeholder="Try searching for 'headphones', 'laptop', etc..."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchClick();
                                        }
                                    }}
                                    disabled={showCart}
                                />
                                <Button variant="primary" className="btn-modern btn-primary" onClick={handleSearchClick} disabled={showCart}>
                                    <Search />
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col md={2} xs={4} className="mb-3">
                            <Button 
                                variant="warning"
                                id="button-cart"
                                className="d-flex align-items-center justify-content-center w-100 btn-modern btn-primary"
                                onClick={() => setShowCart(!showCart)}
                            >
                                <Cart className="me-1" /> 
                                <span className="d-none d-sm-inline">Cart</span> 
                                <Badge bg="secondary" className="ms-2">{cartItems.length}</Badge>
                            </Button>
                        </Col>
                        </>
                    )}
                </Row>

                <Collapse in={searchQuery !== '' && !showCart}>
                    <div>
                        <Row className="mt-4">
                            <Col xs={12}>
                                <h4>Amazing products found for "{searchQuery}":</h4>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={12} className="text-start">
                                {searchResults.map(item => (
                                    <SearchResult
                                        key={item.title}
                                        name={item.title}
                                        value={item.value}
                                        isInCart={cartItems.some(cartItem => cartItem.title === item.title)}
                                        onAdd={() => handleAddToCart(item)}
                                        onRemove={() => handleRemoveFromCart(item.title)}
                                    />
                                ))}
                            </Col>
                        </Row>
                    </div>
                </Collapse>

                <Collapse in={showCart}>
                    <div className='p-md-5 p-3 pt-md-3 pt-3'>
                        <Row>
                            <Col xs={12}>
                                <Row className="mt-4">
                                    <Col xs={12}>
                                        <h4>Cart:</h4>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col xs={12} md={8} className="text-start mb-3 mb-md-0">
                                        {cartItems.map(item => (
                                            <SearchResult
                                                key={item.title}
                                                name={item.title}
                                                value={item.value}
                                                quantity={item.quantity}
                                                isInCart={true}
                                                isCartOpen={showCart}
                                                onAdd={() => handleAddToCart(item)}
                                                onRemove={() => handleRemoveFromCart(item.title)}
                                                onQuantityChange={handleQuantityChange}
                                            />
                                        ))}
                                    </Col>
                                    <Col xs={12} md={4} className="fs-5 fw-bold">
                                        <div className='border rounded p-3'>Subtotal:<br/>${subtotal}</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Collapse>
            </Container>
        </Layout >
    );
};

export default ShoppingCart;