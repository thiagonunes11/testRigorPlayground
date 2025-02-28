import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar } from "react-bootstrap"

function DemoBlock({ title, instructions, picture, to }) {
    return (
        <Col xs={4}>
            <Link to={to} title={title} className='btn btn-light border border-danger shadow rounded-0 h-100 w-100' role="button">
                <div className="px-2 pt-3 text-center">
                    <Row>
                        <Col class="d-flex">
                            <Row><h3 className='fs-4'>{title}</h3></Row>
                            <Row class="d-flex align-middle">{instructions && <p className='text-break'><small>{instructions}</small></p>}</Row>
                        </Col>
                    </Row>

                </div>
            </Link>
        </Col>
    )
}

export default DemoBlock;