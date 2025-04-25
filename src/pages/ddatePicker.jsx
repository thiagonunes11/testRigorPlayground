
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Row, Col } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";
import Layout from '../components/Layout';

const DdatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Layout
            title={"Date Picker"}
            description={"Choose a date in the date picker to see the value in the field change."}
        >
            <Row className="justify-content-center">
                <Col md={4} className="border px-4 py-5">
                    <h2 className="fs-3 fw-bold text-center pb-4">Pick a date for the event:</h2>
                    <Row>
                        <div className="pt-4 input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                </svg>
                            </span>

                            <DatePicker
                                showIcon={false}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showMonthDropdown
                            />
                        </div>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
};

export default DdatePicker;