import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar } from "react-bootstrap"

function DemoBlock({ title, description, picture, url, isDisabled = false }) {

    return (
        <Col sm={12} md={4} className='mb-md-0 mb-3'>
            <Link to={isDisabled ? "" : url}
                title={title}
                className={`btn btn-light border border-danger shadow rounded-0 h-100 w-100 ${isDisabled ? 'opacity-50' : ''}`}
                role="button"
            >
                <div className="px-2 pt-3 text-center">
                    <Row>
                        <Col class="d-flex">
                            <Row><h3 className='fs-4'>{title}</h3></Row>
                            <Row class="d-flex align-middle">{description && <p className='text-break'><small>{description}</small></p>}</Row>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    )
}

export default DemoBlock;