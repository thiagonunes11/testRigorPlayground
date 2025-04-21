
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Demo from '../components/Demo.jsx';

const DdatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Layout
            title={"Date Picker"}
            description={"Choose a date in the date picker to see the value in the field change."}
        >
            <link rel="stylesheet" href="../style/style.css"></link>

            <div class="row justify-content-center">
                <div class="col-4 border px-4 py-5">
                    <h2 class="fs-3 fw-bold text-center pb-4">Pick a date for the event:</h2>
                    <div class="row">
                        <div class="pt-4 input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-calendar-date"></i></span>


                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showMonthDropdown
                            />


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DdatePicker;