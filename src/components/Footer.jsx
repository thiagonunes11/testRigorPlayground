import {Container, Row, Col, Stack, Image, Nav, NavLink} from "react-bootstrap"

function Footer(){
    return(
        <footer >
            <Container className="fixed-bottom" fluid>
                <Row className="bg-primary justify-content-end text-white p-2">
                    Made with ♥️ by the testRigor team
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;