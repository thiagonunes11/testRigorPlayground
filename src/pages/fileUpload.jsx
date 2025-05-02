import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Layout from '../components/Layout';

const FileUpload = () => {
    const [singleFile, setSingleFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [directory, setDirectory] = useState([]);

    const handleSingleFileChange = (e) => {
        if (e.target.files[0]) {
            setSingleFile(e.target.files[0]);
        }
    };

    const handleMultipleFilesChange = (e) => {
        if (e.target.files) {
            setMultipleFiles(Array.from(e.target.files));
        }
    };

    const handleDirectoryChange = (e) => {
        if (e.target.files) {
            setDirectory(Array.from(e.target.files));
        }
    };

    return (
        <Layout
            title="File Upload" 
            description="Use the inputs below for uploading files or directories.
            It's possible to either select files on the filesystem or to drag and drop them into the desired field below.
            The files are not actually uploaded anywhere."
        >
            <Row className="demo-content justify-content-center">
                <Col>
                    {/* Single File Upload Row */}
                    <Row className="mt-3 mt-md-4">
                        <Col>
                            <Form.Group controlId="singleFile" className='border border-primary rounded p-3 p-md-4 bg-primary bg-opacity-10'>
                                <h3 className="h5 mb-3">Single File Upload</h3>
                                <Form.Label className="d-none">Choose single file</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="file" 
                                        onChange={handleSingleFileChange}
                                        className='border-primary'
                                        id='inputFileSingle'
                                    />
                                    <InputGroup.Text className="border-primary btn btn-outline-primary" htmlFor="inputFileSingle">
                                        <div style={{ color: 'var(--text)' }}>Upload</div>
                                    </InputGroup.Text>
                                </InputGroup>
                                {singleFile && (
                                    <small className="text-muted d-block mt-2 text-truncate">
                                        <span style={{ color: 'var(--text)' }}>File name: {singleFile.name}</span>
                                    </small>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Multiple Files Upload Row */}
                    <Row className="mt-3 mt-md-4">
                        <Col>
                            <Form.Group controlId="multipleFiles" className='border border-primary rounded p-3 p-md-4 bg-primary bg-opacity-10'>
                                <h3 className="h5 mb-3">Multiple Files Upload</h3>
                                <Form.Label className="d-none">Choose multiple files</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="file" 
                                        multiple
                                        onChange={handleMultipleFilesChange}
                                        className='border-primary'
                                        id='inputFileMultiple'
                                    />
                                    <InputGroup.Text className="border-primary btn btn-outline-primary" htmlFor="inputFileMultiple">
                                        <div style={{ color: 'var(--text)' }}>Upload</div>
                                    </InputGroup.Text>
                                </InputGroup>
                                {multipleFiles.length > 0 && (
                                    <div className="mt-2" style={{ color: 'var(--text)' , opacity: 0.75}}>
                                        <small className="d-block">Selected files:</small>
                                        <div className="small text-truncate">
                                            {multipleFiles.map(file => file.name).join(', ')}
                                        </div>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Directory Upload Row */}
                    <Row className="mt-3 mt-md-4 mb-4">
                        <Col>
                            <Form.Group controlId="directory" className='border border-primary rounded p-3 p-md-4 bg-primary bg-opacity-10'>
                                <h3 className="h5 mb-3">Directory Upload (Webkit)</h3>
                                <Form.Label className="d-none">Choose directory</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="file"
                                        webkitdirectory="true"
                                        directory="true"
                                        onChange={handleDirectoryChange}
                                        className='border-primary'
                                        id='inputFileDirectory'
                                    />
                                    <InputGroup.Text className="border-primary btn btn-outline-primary" htmlFor="inputFileDirectory">
                                        <div style={{ color: 'var(--text)' }}>Upload</div>
                                    </InputGroup.Text>
                                </InputGroup>
                                {directory.length > 0 && (
                                    <div className="mt-2" style={{ color: 'var(--text)' , opacity: 0.75}}>
                                        <small className="d-block">Selected files:</small>
                                        <div className="small text-truncate">
                                            {directory.map(file => file.name).join(', ')}
                                        </div>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
};

export default FileUpload;