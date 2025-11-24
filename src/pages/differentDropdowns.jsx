import React, { useState } from 'react';
import Layout from '../components/Layout';
import AngularMat from '../components/dropdowns/AngularMat';
import AngularNg from '../components/dropdowns/AngularNg';
import AngularNgx from '../components/dropdowns/AngularNgx';
import ReactDropdown from '../components/dropdowns/ReactDropdown';
import ReactSemantic from '../components/dropdowns/ReactSemantic';
import JQuerySelect2 from '../components/dropdowns/JQuerySelect2';

const DifferentDropdowns = () => {
    const [matValue, setMatValue] = useState("");
    const [ngValue, setNgValue] = useState(null);
    const [ngxValue, setNgxValue] = useState(null);
    const [reactDDValue, setReactDDValue] = useState(null);
    const [semanticValue, setSemanticValue] = useState(null);
    const [jqValue, setJqValue] = useState("JQueryOption4");


    return (
        <Layout
            title="Various Dropdowns"
            description="A demonstration of different dropdown implementations."
        >
            <div className="Wrapper">
                <AngularMat
                    label="Angular Material Design"
                    value={matValue}
                    onChange={setMatValue}
                    options={[
                        "MatOption1",
                        "MatOption2",
                        "MatOption3",
                        "MatOption4"
                    ]}
                />
                <AngularNg
                    label="Angular Ng Select"
                    options={[
                        "NgSelectOption1",
                        "NgSelectOption2",
                        "NgSelectOption3",
                        "NgSelectOption4",
                    ]}
                    value={ngValue}
                    onChange={setNgValue}
                    placeholder=""
                />
                <AngularNgx
                    label="Angular Ngx Select"
                    options={[
                        "NgxSelectOption1",
                        "NgxSelectOption2",
                        "NgxSelectOption3",
                        "NgxSelectOption4",
                    ]}
                    value={ngxValue}
                    onChange={setNgxValue}
                    placeholder="Select"
                />
            </div>
            <ReactDropdown
                options={[
                    "ReactDropdownOption1",
                    "ReactDropdownOption2",
                    "ReactDropdownOption3",
                    "ReactDropdownOption4",
                ]}
                value={reactDDValue}
                onChange={setReactDDValue}
            />
            <ReactSemantic
                options={[
                    "ReactSemanticOption1",
                    "ReactSemanticOption2",
                    "ReactSemanticOption3",
                    "ReactSemanticOption4",
                ]}
                value={semanticValue}
                onChange={setSemanticValue}
            />
            <JQuerySelect2
                options={[
                    "JQueryOption1",
                    "JQueryOption2",
                    "JQueryOption3",
                    "JQueryOption4",
                ]}
                value={jqValue}
                onChange={setJqValue}
                placeholder="Select an option"
            />
        </Layout>
    );
};

export default DifferentDropdowns;
