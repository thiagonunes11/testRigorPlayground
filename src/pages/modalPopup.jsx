import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Demo from "../components/Demo.jsx";


const ModalPopup = () => {
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);

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

    return (
        <Demo>
          
            
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-6 border p-2">
                        <h1 className="fs-2 fw-bold mt-3 mb-4">Modal Popup</h1>
                        <p><small>Click the button below to open a modal popup</small></p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Button className="btn btn-primary w-25" onClick={handleShowFirstModal}>
                        Open first modal
                    </Button>

                    {/* First Modal */}
                    <Modal show={showFirstModal} onHide={handleCloseFirstModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal 1</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Hi. This is the first modal popup.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleShowSecondModal}>
                                Open second modal
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Second Modal */}
                    <Modal show={showSecondModal} onHide={handleCloseSecondModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal 2</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Hi. This is the second modal popup.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleBackToFirstModal}>
                                Back to first
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
         
        </Demo>
    );
};

export default ModalPopup;