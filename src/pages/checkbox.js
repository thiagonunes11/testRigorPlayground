import React from 'react';

const CheckboxPage = () => {
    return (
        <main className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-6 border p-2 pt-4 justify-content-center">
                    <h1 className="fs-2 fw-bold">Checkbox</h1>
                    <p><small>Click on checkboxes in order to select the desired option.</small></p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
                {/* First Box */}
                <div style={{ border: '1px solid #ccc', borderRadius: '20px', padding: '40px', width: '45%' }}>
                    <h3>Checkboxes with Labels</h3>
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

                {/* Second Box */}
                <div style={{ border: '1px solid #ccc', borderRadius: '20px', padding: '40px', width: '45%' }}>
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
            </div>
        </main>

    );
};

export default CheckboxPage;