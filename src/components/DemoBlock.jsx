import { Link } from 'react-router-dom';
import { Col } from "react-bootstrap"

function DemoBlock({ title, description, picture, url, isDisabled = false }) {
    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link 
                to={isDisabled ? "" : url}
                className={`text-decoration-none ${isDisabled ? 'opacity-50' : ''}`}
                role="button"
            >
                <div className="glass-card">
                    <div className="card-content">
                        <h3 className="card-title h5 gradient-text mb-3">{title}</h3>
                        {description && (
                            <p className="card-text text-light-muted small mb-0">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </Col>
    )
}

export default DemoBlock;