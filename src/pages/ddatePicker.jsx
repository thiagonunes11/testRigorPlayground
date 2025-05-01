import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from '../components/Layout';

const DdatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Layout
        title={"Date Picker"}
        description={"Choose a date in the date picker to see the value in the field change."}
    >
      <Container className="my-4">
        {/* Header Section */}
        <Row className="justify-content-center mb-4">
          <Col md={8} lg={6}>
            <Card className="text-center border-primary">
              <Card.Body>
                <Card.Title as="h1" className="fw-bold mb-3">Date Picker</Card.Title>
                <Card.Text className="text-muted">
                  Choose a date in the date picker to see the value in the field change.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Date Picker Section */}
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="border-primary">
              <Card.Body className="p-4">
                <Card.Title as="h2" className="text-center fw-bold mb-4">
                  Pick a date for the event:
                </Card.Title>
                
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DdatePicker;