import React from 'react';
import Prompt from '../components/Prompt';
import Demo from '../components/Demo.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CheckboxPage = () => {
    return (
        <Layout
            title={"Checkbox"}
            description={"Click on checkboxes in order to select the desired option."}
        >

            <Container style={{ display: 'flex', justifyContent: 'space-evenly', padding: '80px' }}>
                {/* First Box */}
                <div style={{ border: '1px solid #ccc', borderRadius: '20px', padding: '40px', width: '25%' }}>
                    <h3>Checkboxes with Labels</h3>
                    <div>
                        <div>
                            <label>
                                <input type="checkbox" name="first" /> First
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="second" /> Second
                            </label>
                        </div>
                    </div>

                </div>

                {/* Second Box */}
                <div style={{ border: '1px solid #ccc', borderRadius: '20px', padding: '40px', width: '25%' }}>
                    <h3>Checkboxes with Numbers</h3>
                    <div>
                        <label>
                            <input type="checkbox" name="one" /> 1
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="two" /> 2
                        </label>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default CheckboxPage;