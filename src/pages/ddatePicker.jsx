import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from '../components/Layout';

const DdatePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <Layout
        title="Date Picker" 
        description="Choose a start and end date to see the values update."
    >
        <Row className="demo-content justify-content-center">
            <Col md={6} lg={4}>
                <div className="mb-4">Pick a start and end date for the event:</div>
                <Form.Group controlId="datePicker">
                    <Form.Label visuallyHidden>Select Date Range</Form.Label>
                    <div className="d-flex align-items-center">
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                const [start, end] = update;
                                if (start && end && end < start) {
                                    setDateRange([end, null]);
                                    return;
                                }
                                setDateRange(update);
                            }}
                            dateFormat="MMM d, yyyy"
                            placeholderText="Start date - End date"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className="form-control"
                            wrapperClassName="w-100"
                            popperPlacement="bottom-start"
                        />
                        <span className="ms-2 fs-4">
                        <i className="bi bi-calendar-date"></i>
                        </span>
                    </div>
                    <div className="mt-3 small text-muted">
                        <div>Start: {startDate ? startDate.toLocaleDateString() : "—"}</div>
                        <div>End: {endDate ? endDate.toLocaleDateString() : "—"}</div>
                    </div>
                </Form.Group>
            </Col>
        </Row>
    </Layout>
  );
};

export default DdatePicker;