import React from 'react';

const CheckboxPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <h1 className="fs-2 fw-bold">Checkbox</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
                {/* First Box */}
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%' }}>
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
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%' }}>
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
        </div>

    );
};

export default CheckboxPage;