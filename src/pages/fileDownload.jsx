import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import Layout from '../components/Layout';

// Import all sample files
import sampleCSV from '../assets/file_samples/sample.csv';
import sampleDOC from '../assets/file_samples/sample.doc';
import sampleDOCX from '../assets/file_samples/sample.docx';
import sampleODP from '../assets/file_samples/sample.odp';
import sampleODS from '../assets/file_samples/sample.ods';
import sampleODT from '../assets/file_samples/sample.odt';
import sampleOTT from '../assets/file_samples/sample.ott';
import samplePDF from '../assets/file_samples/sample.pdf';
import samplePPT from '../assets/file_samples/sample.ppt';
import samplePPTX from '../assets/file_samples/sample.pptx';
import sampleRTF from '../assets/file_samples/sample.rtf';
import sampleTXT from '../assets/file_samples/sample.txt';
import sampleXLS from '../assets/file_samples/sample.xls';
import sampleXLSX from '../assets/file_samples/sample.xlsx';

const fileGroups = [
    [
        { file: samplePPTX, name: 'PPTX', label: 'Download PPTX File' },
        { file: sampleXLSX, name: 'XLSX', label: 'Download XLSX File' },
        { file: sampleCSV, name: 'CSV', label: 'Download CSV File' }
    ],
    [
        { file: sampleXLS, name: 'XLS', label: 'Download XLS File' },
        { file: sampleTXT, name: 'TXT', label: 'Download TXT File' },
        { file: sampleRTF, name: 'RTF', label: 'Download RTF File' }
    ],
    [
        { file: samplePPT, name: 'PPT', label: 'Download PPT File' },
        { file: samplePDF, name: 'PDF', label: 'Download PDF File' },
        { file: sampleOTT, name: 'OTT', label: 'Download OTT File' }
    ],
    [
        { file: sampleODT, name: 'ODT', label: 'Download ODT File' },
        { file: sampleODS, name: 'ODS', label: 'Download ODS File' },
        { file: sampleODP, name: 'ODP', label: 'Download ODP File' }
    ],
    [
        { file: sampleDOCX, name: 'DOCX', label: 'Download DOCX File' },
        { file: sampleDOC, name: 'DOC', label: 'Download DOC File' }
    ]
];

const FileDownload = () => {
    const handleDownload = (file, fileName) => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = file;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Layout
            title="File Download" 
            description="Click the buttons below to download sample files."
        >
            <Row className="demo-content justify-content-center">
                <Container className="mb-4">
                    <Stack gap={3}>
                    {fileGroups.map((group, groupIndex) => (
                        <Row key={groupIndex} className="g-2 justify-content-center">
                        {group.map((file, fileIndex) => (
                            <Col key={fileIndex} xs={12} sm={6} md={4} lg={3}>
                                <Button 
                                    className="btn-modern btn-secondary w-100 py-2"
                                    onClick={() => handleDownload(file.file, `sample.${file.name.toLowerCase()}`)}
                                >
                                    {file.label}
                                </Button>
                            </Col>
                        ))}
                        {/* Add empty cols if group has less than 3 items */}
                        {group.length < 3 && Array(3 - group.length).fill(0).map((_, i) => (
                            <Col key={`empty-${i}`} xs={12} sm={6} md={4} lg={3} className="d-none d-sm-block" />
                        ))}
                        </Row>
                    ))}
                    </Stack>
                </Container>
            </Row>
        </Layout>
    );
};

export default FileDownload;