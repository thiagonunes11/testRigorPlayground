// DatePickerComponent.js
import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DatePickerComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const datepicker = new TheDatepicker.Datepicker(inputRef.current);
      datepicker.options.setInputFormat('m/d/Y');
      datepicker.render();
    }
  }, []);

  return (
    <div className="container p-5">
      <div className="row justify-content-center text-center mb-5">
        <div className="col-6 border p-2">
          <h1 className="fs-2 fw-bold mt-3 mb-4">Date Picker</h1>
          <p><small>Choose a date in the date picker to see the value in the field change.</small></p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4 border px-4 py-5">
          <h2 className="fs-3 fw-bold text-center pb-4">Pick a date for the event:</h2>
          <div className="row">
            <div className="pt-4 input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-calendar-date"></i>
              </span>
              <input
                type="text"
                id="datepicker"
                className="form-control"
                aria-label="Event's date"
                aria-describedby="event-button"
                ref={inputRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerComponent;