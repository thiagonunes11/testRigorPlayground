import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Form, InputGroup, Button, Overlay, Popover } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input as SemanticInput } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { loadJqueryPlugins } from "./datePicker/jqueryGlobals";
import Layout from "../components/Layout";
import "../styles/datePicker.css";

const PickerBlock = ({ label, htmlFor, children }) => (
  <div className="picker-block">
    <Form.Label className="picker-label" htmlFor={htmlFor}>
      {label}
    </Form.Label>
    {children}
  </div>
);

const SemanticDateInput = React.forwardRef(
  ({ value, onClick, onChange, placeholder, ...props }, ref) => (
    <SemanticInput
      ref={ref}
      value={value}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder}
      icon="calendar"
      iconPosition="left"
      fluid
      {...props}
    />
  )
);
SemanticDateInput.displayName = "SemanticDateInput";

const openHtmlDatePicker = (event) => {
  try {
    event.currentTarget.showPicker?.();
  } catch {
    // Ignore unsupported browsers or blocked picker calls.
  }
};

const datePickerLayerProps = {
  portalId: "datepicker-portal",
  popperClassName: "datepicker-popper-top",
  popperProps: { strategy: "fixed" },
};

const BootstrapDatepicker = () => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const target = useRef(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const days = [];
  for (let i = 0; i < firstDay; i += 1) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    days.push(d);
  }

  const selectDay = (day) => {
    const selected = new Date(year, month, day);
    setDate(selected);
    setShow(false);
  };

  return (
    <>
      <InputGroup>
        <Form.Control
          ref={target}
          readOnly
          placeholder="yyyy-mm-dd"
          value={date ? date.toISOString().slice(0, 10) : ""}
          onClick={() => setShow((open) => !open)}
          aria-label="Enter an Angular Bootstrap Datepicker"
          className="form-control-lg"
        />
        <Button
          variant="outline-secondary"
          className="btn-lg"
          onClick={() => setShow((open) => !open)}
          aria-label="Toggle Angular Bootstrap Datepicker"
        >
          <i className="bi bi-calendar3" />
        </Button>
      </InputGroup>
      <Overlay
        target={target.current}
        show={show}
        placement="bottom-start"
        container={typeof document !== "undefined" ? document.body : undefined}
        popperConfig={{ strategy: "fixed" }}
        rootClose
        onHide={() => setShow(false)}
      >
        <Popover id="bootstrap-datepicker-popover" className="bootstrap-datepicker-popover datepicker-overlay-top">
          <Popover.Body>
            <div className="ngb-dp-header d-flex justify-content-between align-items-center mb-2">
              <Button
                size="sm"
                variant="light"
                aria-label="Previous month"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
              >
                ‹
              </Button>
              <strong>{monthLabel}</strong>
              <Button
                size="sm"
                variant="light"
                aria-label="Next month"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
              >
                ›
              </Button>
            </div>
            <div className="ngb-dp-weekdays d-grid bootstrap-dp-grid mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center small text-muted">
                  {day}
                </div>
              ))}
            </div>
            <div className="ngb-dp-months d-grid bootstrap-dp-grid">
              {days.map((day, index) =>
                day ? (
                  <Button
                    key={`${year}-${month}-${day}`}
                    size="sm"
                    variant={
                      date &&
                      date.getFullYear() === year &&
                      date.getMonth() === month &&
                      date.getDate() === day
                        ? "primary"
                        : "light"
                    }
                    className="bootstrap-dp-day"
                    onClick={() => selectDay(day)}
                  >
                    {day}
                  </Button>
                ) : (
                  <span key={`empty-${index}`} />
                )
              )}
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

const JqueryCalendar = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let $input;

    loadJqueryPlugins()
      .then(($) => {
        if (cancelled || !inputRef.current) return;

        $input = $(inputRef.current);
        $input.daterangepicker({
          autoUpdateInput: false,
          locale: { cancelLabel: "Clear" },
        });
        $input.val("");

        $input.on("apply.daterangepicker", (_event, picker) => {
          $input.val(
            `${picker.startDate.format("MM/DD/YYYY")} - ${picker.endDate.format("MM/DD/YYYY")}`
          );
        });
        $input.on("cancel.daterangepicker", () => {
          $input.val("");
        });
      })
      .catch((error) => {
        console.error("Failed to initialize JQuery Calendar", error);
      });

    return () => {
      cancelled = true;
      if ($input) {
        $input.off("apply.daterangepicker cancel.daterangepicker");
        const picker = $input.data("daterangepicker");
        if (picker) {
          picker.remove();
        }
      }
    };
  }, []);

  return (
    <Form.Control
      ref={inputRef}
      id="jquery-calendar"
      type="text"
      name="jquery-dates"
      className="form-control form-control-lg"
      placeholder="Select date range"
      aria-label="Enter a JQuery Calendar"
      readOnly
    />
  );
};

const JqueryDatepicker = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let $input;

    loadJqueryPlugins()
      .then(($) => {
        if (cancelled || !inputRef.current) return;

        $input = $(inputRef.current);
        $input.datepicker();
        $input.val("");
      })
      .catch((error) => {
        console.error("Failed to initialize JQuery Datepicker", error);
      });

    return () => {
      cancelled = true;
      if ($input && $input.data("datepicker")) {
        $input.datepicker("destroy");
      }
    };
  }, []);

  return (
    <Form.Control
      ref={inputRef}
      id="jquery-datepicker"
      type="text"
      name="jquery-datepicker"
      className="form-control form-control-lg"
      placeholder="Select date"
      aria-label="Enter a JQuery Datepicker"
      readOnly
    />
  );
};

const DatePickerPage = () => {
  const [nativeDate, setNativeDate] = useState("");
  const [nativeRangeStart, setNativeRangeStart] = useState("");
  const [nativeRangeEnd, setNativeRangeEnd] = useState("");
  const [reactDate, setReactDate] = useState(null);
  const [reactDateTime, setReactDateTime] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [semanticDateTime, setSemanticDateTime] = useState(null);
  const [semanticDateRange, setSemanticDateRange] = useState([null, null]);
  const [semanticDate, setSemanticDate] = useState(null);
  const [materialDate, setMaterialDate] = useState(null);

  const [semanticRangeStart, semanticRangeEnd] = semanticDateRange;

  return (
    <Layout
      title="Date Picker"
      description="Try common date, time, and range pickers used across web apps."
    >
      <Row className="demo-content">
        <Col xs={12} className="picker-list">
          <PickerBlock label="HTML Date" htmlFor="html-date">
            <Form.Control
              id="html-date"
              type="date"
              className="form-control-lg"
              value={nativeDate}
              onChange={(e) => setNativeDate(e.target.value)}
              onClick={openHtmlDatePicker}
              aria-label="Enter a HTML Date"
            />
          </PickerBlock>

          <PickerBlock label="HTML Date Range">
            <div className="d-flex flex-column gap-2">
              <Form.Control
                id="html-date-range-start"
                type="date"
                className="form-control-lg"
                value={nativeRangeStart}
                max={nativeRangeEnd || undefined}
                onChange={(e) => setNativeRangeStart(e.target.value)}
                onClick={openHtmlDatePicker}
                aria-label="Enter a HTML Date Range start"
              />
              <Form.Control
                id="html-date-range-end"
                type="date"
                className="form-control-lg"
                value={nativeRangeEnd}
                min={nativeRangeStart || undefined}
                onChange={(e) => setNativeRangeEnd(e.target.value)}
                onClick={openHtmlDatePicker}
                aria-label="Enter a HTML Date Range end"
              />
            </div>
          </PickerBlock>

          <PickerBlock label="React Date">
            <ReactDatePicker
              selected={reactDate}
              onChange={setReactDate}
              placeholderText="Select date"
              dateFormat="MMM d, yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              wrapperClassName="w-100"
              customInput={
                <Form.Control
                  className="form-control-lg"
                  aria-label="Enter a React Date"
                />
              }
              {...datePickerLayerProps}
            />
          </PickerBlock>

          <PickerBlock label="React DateTime">
            <ReactDatePicker
              selected={reactDateTime}
              onChange={setReactDateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              placeholderText="Select date and time"
              wrapperClassName="w-100"
              customInput={
                <Form.Control
                  className="form-control-lg"
                  aria-label="Enter a React DateTime"
                />
              }
              {...datePickerLayerProps}
            />
          </PickerBlock>

          <PickerBlock label="React DateRange">
            <div className="d-flex flex-column gap-2">
              <ReactDatePicker
                selected={rangeStart}
                onChange={setRangeStart}
                selectsStart
                startDate={rangeStart}
                endDate={rangeEnd}
                placeholderText="Start date"
                wrapperClassName="w-100"
                customInput={
                  <Form.Control
                    className="form-control-lg"
                    aria-label="React DateRange start"
                  />
                }
                {...datePickerLayerProps}
              />
              <ReactDatePicker
                selected={rangeEnd}
                onChange={setRangeEnd}
                selectsEnd
                startDate={rangeStart}
                endDate={rangeEnd}
                minDate={rangeStart}
                placeholderText="End date"
                wrapperClassName="w-100"
                customInput={
                  <Form.Control
                    className="form-control-lg"
                    aria-label="React DateRange end"
                  />
                }
                {...datePickerLayerProps}
              />
            </div>
          </PickerBlock>

          <PickerBlock label="React Semantic DateTime">
            <ReactDatePicker
              selected={semanticDateTime}
              onChange={setSemanticDateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              placeholderText="Date Time"
              customInput={<SemanticDateInput aria-label="Enter a React Semantic DateTime" />}
              wrapperClassName="w-100"
              {...datePickerLayerProps}
            />
          </PickerBlock>

          <PickerBlock label="React Semantic DateRange">
            <ReactDatePicker
              selectsRange
              startDate={semanticRangeStart}
              endDate={semanticRangeEnd}
              onChange={(update) => {
                const [start, end] = update;
                if (start && end && end < start) {
                  setSemanticDateRange([end, null]);
                  return;
                }
                setSemanticDateRange(update);
              }}
              dateFormat="MMMM d, yyyy"
              placeholderText="From - To"
              customInput={<SemanticDateInput aria-label="Enter a React Semantic DateRange" />}
              wrapperClassName="w-100"
              {...datePickerLayerProps}
            />
          </PickerBlock>

          <PickerBlock label="React Semantic Date">
            <ReactDatePicker
              selected={semanticDate}
              onChange={setSemanticDate}
              dateFormat="MMMM d, yyyy"
              placeholderText="Date"
              customInput={<SemanticDateInput aria-label="Enter a React Semantic Date" />}
              wrapperClassName="w-100"
              {...datePickerLayerProps}
            />
          </PickerBlock>

          <PickerBlock label="Angular Bootstrap Datepicker">
            <BootstrapDatepicker />
          </PickerBlock>

          <PickerBlock label="Angular Material Datepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MuiDatePicker
                label="Choose a date"
                value={materialDate}
                onChange={setMaterialDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "medium",
                    inputProps: { "aria-label": "Enter an Angular Material Datepicker" },
                  },
                  popper: {
                    sx: { zIndex: 3000 },
                    disablePortal: false,
                  },
                }}
              />
            </LocalizationProvider>
          </PickerBlock>

          <PickerBlock label="JQuery Calendar" htmlFor="jquery-calendar">
            <JqueryCalendar />
          </PickerBlock>

          <PickerBlock label="JQuery Datepicker" htmlFor="jquery-datepicker">
            <JqueryDatepicker />
          </PickerBlock>
        </Col>
      </Row>
    </Layout>
  );
};

export default DatePickerPage;
