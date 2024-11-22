import {Container, Row, Col, Stack, Image, Nav, NavLink, Navbar} from "react-bootstrap"

function Header(){
    return(
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/" className="mx-4">testRigor Playground 🛝</Navbar.Brand>
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header;