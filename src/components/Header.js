import {Container, Row, Col, Stack, Image, Nav, NavLink} from "react-bootstrap"

function Header(){
    return(
        <header >
            <Container fluid>
                <Row className="bg-light text-dark p-3">
                    testRigor Playground 🛝
                </Row>
                    
            </Container> 
            
        </header>
    )
}

export default Header;