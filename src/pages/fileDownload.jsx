import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

import sampleCSV from '../assets/file_samples/sample.csv'
import sampleDOC from '../assets/file_samples/sample.doc'
import sampleDOCX from '../assets/file_samples/sample.docx'
import sampleODP from '../assets/file_samples/sample.odp'
import sampleODS from '../assets/file_samples/sample.ods'
import sampleODT from '../assets/file_samples/sample.odt'
import sampleOTT from '../assets/file_samples/sample.ott'
import samplePDF from '../assets/file_samples/sample.pdf'
import samplePPT from '../assets/file_samples/sample.ppt'
import samplePPTX from '../assets/file_samples/sample.pptx'
import sampleRTF from '../assets/file_samples/sample.rtf'
import sampleTXT from '../assets/file_samples/sample.txt'
import sampleXLS from '../assets/file_samples/sample.xls'
import sampleXLSX from '../assets/file_samples/sample.xlsx'

const FileDownload = () => {
    return (
        <Layout
            title="File Download"
            description="Click the button below to download the file."
        >
            <Container>
                <Row className="justify-content-center text-center">
                    <Col>
                        <Link to={samplePPTX} download="sample.pptx">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download PPTX File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleXLSX} download="sample.xlsx">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download XLSX File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleCSV} download="sample.csv">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download CSV File</Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="mt-2 justify-content-center text-center">
                    <Col>
                        <Link to={sampleXLS} download="sample.xls">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download XLS File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleTXT} download="sample.txt">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download TXT File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleRTF} download="sample.rtf">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download RTF File</Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="mt-2 justify-content-center text-center">
                    <Col>
                        <Link to={samplePPT} download="sample.ppt">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download PPT File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={samplePDF} download="sample.pdf">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download PDF File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleOTT} download="sample.ott">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download OTT File</Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="mt-2 justify-content-center text-center">
                    <Col>
                        <Link to={sampleODT} download="sample.odt">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download ODT File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleODS} download="sample.ods">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download ODS File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleODP} download="sample.odp">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download ODP File</Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="mt-2 justify-content-center text-center">
                    <Col>
                        <Link to={sampleDOCX} download="sample.docx">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download DOCX File</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={sampleDOC} download="sample.doc">
                            <Button className={"btn-modern"} variant="primary" size="lg">Download DOC File</Button>
                        </Link>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default FileDownload;
