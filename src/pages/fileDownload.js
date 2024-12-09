import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Prompt from '../components/Prompt.js'
import Demo from '../components/Demo.js';
import { Link } from 'react-router-dom';
import samplePdf from '../assets/samples/sample_pdf.pdf';

const FileDownload = () => {
    return (
        <Demo>
            <Prompt title="File Download" instructions="Click the button below to download the file." />
            <Container>
                <Row className="mt-5 justify-content-center text-center">
                    <Col>
                        <a href={samplePdf} download="sample_pdf.pdf">
                            <Button variant="primary">
                                Download File
                            </Button>
                        </a>
                    </Col>
                </Row>
            </Container>
        </Demo>
    );
};

export default FileDownload;
