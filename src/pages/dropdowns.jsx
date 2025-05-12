import React, { useState } from 'react';
import Layout from '../components/Layout'; 
import { Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Dropdowns() {
    const [simpleDropdownValue, setSimpleDropdownValue] = useState("Dropdown button");
    const [simpleSelect, setSimpleSelectValue] = useState("Open this select menu");
    const [splitDropdownValue, setSplitDropdownValue] = useState("Split dropdown button");
    const [singleListSelectValue, setSingleListSelectValue] = useState("");
    const [multipleListSelectValue, setMultipleListSelectValue] = useState("");

    const handleMultipleSelectChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setMultipleListSelectValue(selectedOptions.join(", "));
    };

    return (
        <>
            <style>
                {`
                /* Ajusta os botões de dropdown para se adaptarem ao dark mode */
                .dropdown-menu {
                    background-color: var(--bs-body-bg);
                    color: var(--bs-body-color);
                    border-color: var(--bs-border-color);
                }

                .dropdown-item {
                    color: var(--bs-body-color);
                }

                .dropdown-item:hover, .dropdown-item:focus {
                    background-color: var(--bs-primary-bg-subtle);
                    color: var(--bs-primary-text);
                }

                .btn-primary, .btn-secondary {
                    background-color: var(--bs-btn-bg);
                    color: var(--bs-btn-color);
                    border-color: var(--bs-btn-border-color);
                }

                .btn-primary:hover, .btn-secondary:hover {
                    background-color: var(--bs-btn-hover-bg);
                    color: var(--bs-btn-hover-color);
                    border-color: var(--bs-btn-hover-border-color);
                }

                .btn-primary:focus, .btn-secondary:focus {
                    box-shadow: 0 0 0 0.25rem var(--bs-btn-focus-shadow-rgb);
                }
                `}
            </style>

            <Layout title="Dropdowns" description="You can click and select options on the different forms of dropdowns and selections, and check the selected options on the right.">
                <Row className="mt-5">
                    <Col>
                        <div className="mb-5">
                            <p className="fs-3 fw-bold">Simple dropdown</p>
                            <Dropdown as={ButtonGroup}>
                                <DropdownButton 
                                    id="dropdown-basic-button" 
                                    title={simpleDropdownValue} 
                                    variant="secondary"
                                >
                                    <Dropdown.Item onClick={() => setSimpleDropdownValue("Action")}>Action</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSimpleDropdownValue("Another action")}>Another action</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSimpleDropdownValue("Something else here")}>Something else here</Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                        </div>

                        <div className="mb-5">
                            <p className="fs-3 fw-bold">Split dropdown</p>
                            <Dropdown as={ButtonGroup}>
                                <Button variant="primary">{splitDropdownValue}</Button>
                                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSplitDropdownValue("Action")}>Action</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSplitDropdownValue("Another action")}>Another action</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSplitDropdownValue("Something else here")}>Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => setSplitDropdownValue("Separated link")}>Separated link</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="mb-5">
                            <p className="fs-3 fw-bold">Simple select</p>
                            <Form.Select onChange={(e) => setSimpleSelectValue(e.target.value)} aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                            </Form.Select>
                        </div>

                        <div className="mb-5">
                            <p className="fs-3 fw-bold">Single list select</p>
                            <Form.Select onChange={(e) => setSingleListSelectValue(e.target.value)} aria-label="Default select example" htmlSize={3}>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                                <option value="Four">Four</option>
                            </Form.Select>
                        </div>

                        <div className="mb-5">
                            <p className="fs-3 fw-bold m-1">Multiple list select</p>
                            <p>Hold <b>ctrl</b> while clicking or click and drag in order to select/deselect multiple options.</p>
                            <Form.Select onChange={handleMultipleSelectChange} aria-label="Default select example" multiple>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                                <option value="Four">Four</option>
                            </Form.Select>
                        </div>
                    </Col>
                    <Col>
                        <p className="fs-3 fw-bold">Selected options</p>
                        <ul className="text-start">
                            <li>Simple dropdown: {simpleDropdownValue}</li>
                            <li>Split dropdown: {splitDropdownValue}</li>
                            <li>Simple select: {simpleSelect}</li>
                            <li>Single list select: {singleListSelectValue}</li>
                            <li>Multiple list select: {multipleListSelectValue}</li>
                        </ul>
                    </Col>
                </Row>
            </Layout>
        </>
    );
}

export default Dropdowns;