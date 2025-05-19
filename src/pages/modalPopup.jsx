import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Layout from '../components/Layout';

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

    const getCloseButtonClass = () => {
        return document.body.classList.contains('dark-mode') ? 'btn-close-white' : '';
    }

    return (
        <Layout
            title={"Modal Popup"}
            description={"Click the button below to open a modal popup"}
        >
            <div className="row justify-content-center">
                <Button className="btn btn-primary btn-modern w-25" onClick={handleShowFirstModal}>
                    Open first modal
                </Button>

                {/* First Modal */}
                <Modal show={showFirstModal} onHide={handleCloseFirstModal} centered>
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
                <Modal show={showSecondModal} onHide={handleCloseSecondModal} centered>
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