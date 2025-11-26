import React, { useState } from 'react';
import Layout from '../components/Layout';
import AngularMat from '../components/dropdowns/AngularMat';
import AngularNg from '../components/dropdowns/AngularNg';
import AngularNgx from '../components/dropdowns/AngularNgx';
import ReactDropdown from '../components/dropdowns/ReactDropdown';
import ReactSemantic from '../components/dropdowns/ReactSemantic';
import JQuerySelect2 from '../components/dropdowns/JQuerySelect2';
import AnimatedDropdown from '../components/dropdowns/AnimatedDropdown';
import DelayedDropdown from '../components/dropdowns/DelayedDropdown';
import { Row, Col, Container } from 'react-bootstrap';

const AdvancedDropdowns = () => {
    const [matValue, setMatValue] = useState("");
    const [ngValue, setNgValue] = useState(null);
    const [ngxValue, setNgxValue] = useState(null);
    const [reactDDValue, setReactDDValue] = useState(null);
    const [semanticValue, setSemanticValue] = useState(null);
    const [jqValue, setJqValue] = useState(null);
    const [val, setVal] = useState(null);
    const [delayedValue, setDelayedValue] = useState(null);



    return (
        <Layout
            title="Advanced Dropdowns"
            description="A demonstration of different dropdown implementations."
        >
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Row className="g-4 mb-3">
                            <Col md={6}>
                                <AngularMat
                                    label="Angular Material Design"
                                    value={matValue}
                                    onChange={setMatValue}
                                    options={["MatOption1", "MatOption2", "MatOption3", "MatOption4"]}
                                />
                            </Col>
                            <Col md={6}>
                                <ReactSemantic
                                    label="React Semantic Select"
                                    options={[
                                        "ReactSemanticOption1",
                                        "ReactSemanticOption2",
                                        "ReactSemanticOption3",
                                        "ReactSemanticOption4",
                                    ]}
                                    value={semanticValue}
                                    onChange={setSemanticValue}
                                />
                            </Col>
                        </Row>

                        <Row className="g-4 mb-3">
                            <Col md={6}>
                                <AngularNg
                                    label="Angular Ng Select"
                                    options={[
                                        "NgSelectOption1",
                                        "NgSelectOption2",
                                        "NgSelectOption3",
                                        "NgSelectOption4",
                                    ]}
                                    value={ngValue}
                                    onChange={setNgValue}
                                    placeholder=""
                                />
                            </Col>
                            <Col md={6}>
                                <JQuerySelect2
                                    label="JQuery Select2"
                                    options={[
                                        "JQueryOption1",
                                        "JQueryOption2",
                                        "JQueryOption3",
                                        "JQueryOption4",
                                    ]}
                                    value={jqValue}
                                    onChange={setJqValue}
                                    placeholder="Select an option"
                                />
                            </Col>
                        </Row>

                        <Row className="g-4 mb-3">
                            <Col md={6}>
                                <AngularNgx
                                    label="Angular Ngx Select"
                                    options={[
                                        "NgxSelectOption1",
                                        "NgxSelectOption2",
                                        "NgxSelectOption3",
                                        "NgxSelectOption4",
                                    ]}
                                    value={ngxValue}
                                    onChange={setNgxValue}
                                    placeholder="Select"
                                />
                            </Col>
                            <Col md={6}>
                                <AnimatedDropdown
                                    label="Animated Dropdown"
                                    options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                                    value={val}
                                    onChange={setVal}
                                    placeholder="Choose something..."
                                />
                            </Col>
                        </Row>

                        <Row className="g-4">
                            <Col md={6}>
                                <ReactDropdown
                                    label="React Dropdown Select"
                                    options={[
                                        "ReactDropdownOption1",
                                        "ReactDropdownOption2",
                                        "ReactDropdownOption3",
                                        "ReactDropdownOption4",
                                    ]}
                                    value={reactDDValue}
                                    onChange={setReactDDValue}
                                />
                            </Col>
                            <Col md={6}>
                                <DelayedDropdown
                                    label="Delayed Dropdown"
                                    options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                                    value={delayedValue}
                                    onChange={setDelayedValue}
                                    placeholder="Select an option"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <div className="mb-5"></div>
        </Layout>
    );
};

export default AdvancedDropdowns;
