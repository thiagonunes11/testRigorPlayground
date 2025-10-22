import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Layout from '../components/Layout';

const ModalPopup = () => {
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [updatableText, setUpdatableText] = useState("Initial Text");

    const handleUpdateText = () => {
        setUpdatableText("Text was updated!");
    };

    // Allow programmatic triggering even when overlapped by a modal
    useEffect(() => {
        // Expose a global helper
        window.triggerUpdateText = handleUpdateText;

        // Listen for a custom event: document.dispatchEvent(new CustomEvent('updateText'))
        document.addEventListener('updateText', handleUpdateText);

        return () => {
            // Cleanup global helper and event listener
            if (window.triggerUpdateText === handleUpdateText) {
                delete window.triggerUpdateText;
            }
            document.removeEventListener('updateText', handleUpdateText);
        };
    }, []);

    const handleCloseFirstModal = () => setShowFirstModal(false);
    const handleShowFirstModal = () => setShowFirstModal(true);

    const handleCloseSecondModal = () => setShowSecondModal(false);
    const handleShowSecondModal = () => {
        setShowFirstModal(false);
        setShowSecondModal(true);
    };

    const handleBackToFirstModal = () => {
        setShowSecondModal(false);
        setShowFirstModal(true);
    };

    const getCloseButtonClass = () => {
        return document.body.classList.contains('dark-mode') ? 'btn-close-white' : '';
    }

    return (
        <Layout
            title={"Modal Popup"}
            description={"Click the button below to open a modal popup"}
        >
            <div className="row justify-content-center">
                <div className='text-center'>
                    <Row className="mt-5">
                        <Col>
                            <p className='h4'>{updatableText}</p>
                        </Col>
                    </Row>
                    {/* Keep the update button visible while modals are open (still behind backdrop) */}
                    <div className="position-fixed d-none d-md-block" style={{ top: '50%', right: '20px', transform: 'translateY(-50%)', zIndex: 1050 }}>
                        <Button id="update-text-button" className={"btn-modern"} variant="primary" onClick={handleUpdateText}>
                            Update text
                        </Button>
                    </div>
                    {/* Mobile version - positioned differently for smaller screens */}
                    <div className="position-fixed d-md-none" style={{ top: '10px', right: '10px', zIndex: 1050 }}>
                        <Button id="update-text-button-mobile" className={"btn-modern btn-sm"} variant="primary" onClick={handleUpdateText}>
                            Update
                        </Button>
                    </div>
                    <Row className="mt-4">
                        <Col>
                            <Button className="btn btn-primary btn-modern w-25" onClick={handleShowFirstModal}>
                                Open first modal
                            </Button>
                        </Col>
                    </Row>
                </div>

                {/* First Modal */}
                <Modal show={showFirstModal} onHide={handleCloseFirstModal} centered backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Modal 1</Modal.Title>
                        <button
                            className={`btn-close ${getCloseButtonClass()}`}
                            onClick={handleCloseFirstModal}
                            aria-label="Close"
                        ></button>
                    </Modal.Header>
                    <Modal.Body>
                        Hi. This is the first modal popup.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={"btn-modern"} variant="primary" onClick={handleShowSecondModal}>
                            Open second modal
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Second Modal */}
                <Modal show={showSecondModal} onHide={handleCloseSecondModal} centered backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Modal 2</Modal.Title>
                        <button
                            className={`btn-close ${getCloseButtonClass()}`}
                            onClick={handleCloseSecondModal}
                            aria-label="Close"
                        ></button>
                    </Modal.Header>
                    <Modal.Body>
                        Hi. This is the second modal popup.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={"btn-modern"} variant="primary" onClick={handleBackToFirstModal}>
                            Back to first
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </Layout>
    );
};

export default ModalPopup;