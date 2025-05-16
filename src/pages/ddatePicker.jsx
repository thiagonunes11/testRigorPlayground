import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from '../components/Layout';

const DdatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Layout
        title="Date Picker" 
        description="Choose a date in the date picker to see the value in the field change."
    >
        <Row className="demo-content justify-content-center">
            <Col md={6} lg={4}>
                <div className="mb-4">Pick a date for the event:</div>
                <Form.Group controlId="datePicker">
                    <Form.Label visuallyHidden>Select Date</Form.Label>
                    <div className="d-flex align-items-center">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
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
                </Form.Group>
            </Col>
        </Row>
    </Layout>
  );
};

export default DdatePicker;