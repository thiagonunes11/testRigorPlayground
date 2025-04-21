import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Prompt from '../components/Prompt.jsx'
import Demo from '../components/Demo.jsx';

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
            description={"Use the inputs below for uploading files or directories.\nIt's possible to either select files on the filesystem or to drag and drop them into the desired field below.\nThe files are not actually uploaded anywhere."}
        >
            <Container>
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="singleFile" className='border border-primary rounded p-4 pb-2 m-3 bg-primary bg-opacity-10'>
                            <h3 className="mb-3">Single File Upload</h3>
                            <Form.Label className="d-none">Choose single file</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="file"
                                    onChange={handleSingleFileChange}
                                    className='border-primary'
                                    id='inputFileSingle'
                                />
                                <label class="input-group-text border-primary btn btn-outline-primary" for="inputFileSingle">Upload</label>
                            </InputGroup>
                            {singleFile && (
                                <small className="text-muted fs-6 d-block mt-2">
                                    File name: {singleFile.name}
                                </small>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="multipleFiles" className='border border-primary rounded p-4 pb-2 m-3 bg-primary bg-opacity-10'>
                            <h3 className="mb-3">Multiple Files Upload</h3>
                            <Form.Label className="d-none">Choose multiple files</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="file"
                                    multiple
                                    onChange={handleMultipleFilesChange}
                                    className='border-primary'
                                    id='inputFileMultiple'
                                />
                                <label class="input-group-text border-primary btn btn-outline-primary" for="inputFileMultiple">Upload</label>
                            </InputGroup>
                            {multipleFiles.length > 0 && (
                                <small className="text-muted fs-6 d-block mt-2">
                                    File names: {multipleFiles.map(file => file.name).join(', ')}
                                </small>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="directory" className='border border-primary rounded p-4 pb-2 m-3 bg-primary bg-opacity-10'>
                            <h3 className="mb-3">All Files of a Directory (Webkit)</h3>
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
                                <label class="input-group-text border-primary btn btn-outline-primary" for="inputFileDirectory">Upload</label>
                            </InputGroup>
                            {directory.length > 0 && (
                                <small className="text-muted fs-6 d-block mt-2">
                                    File names: {directory.map(file => file.name).join(', ')}
                                </small>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default FileUpload;