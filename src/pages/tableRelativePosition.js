import React, { useEffect, useState } from 'react';
import Prompt from '../components/Prompt.js'
import Demo from "../components/Demo.js";
import { Row, Col, Alert, Collapse } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function TableView({data}) {
    return (
        <table id="random-table" className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Column 1</th>
                    <th scope="col">Column 2</th>
                    <th scope="col">Column 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" className="row-index">Line 1</th>
                    <td id="cell-1">{data[0]}</td>
                    <td id="cell-2">{data[1]}</td>
                    <td id="cell-3">{data[2]}</td>
                </tr>
                <tr>
                    <th scope="row" className="row-index">Line 2</th>
                    <td id="cell-4">{data[3]}</td>
                    <td id="cell-5">{data[4]}</td>
                    <td id="cell-6">{data[5]}</td>
                </tr>
                <tr>
                    <th scope="row" className="row-index">Line 3</th>
                    <td id="cell-7">{data[6]}</td>
                    <td id="cell-8">{data[7]}</td>
                    <td id="cell-9">{data[8]}</td>
                </tr>
            </tbody>
        </table>
    );
}

function TableRelativePosition() {
    const [currentData, setCurrentData] = useState(0);
    const [isSecondQuestion, setIsSecondQuestion] = useState(false);
    const [error, setError] = useState("");
    const [resultInput, setResultInput] = useState("");

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generateData(){
        var tableData = []
        for(let i = 0; i < 9; i++){
            tableData.push(randomIntFromInterval(1, 100));
        }
        return tableData;
    }

    function handleValueCheck(){
        var resultInput = document.getElementById("result");

        if (!isSecondQuestion){
            if (parseInt(resultInput.value) === currentData[1] + currentData[8]){
                setIsSecondQuestion(true);
                setError("");
            }
            else {
                setError("Incorrect, try again.");
            }
        }

        if (isSecondQuestion){
            if (parseInt(resultInput.value) === currentData[3] * currentData[2]){
                setError("Correct!");
            }
            else {
                setError("Incorrect, try again.");
            }
        }
    }

    const handleInputChange = (event) => {
        setResultInput(event.target.value);
        setError('');
    };

    useEffect(() => {
        setCurrentData(generateData());
    }, [isSecondQuestion]);

    return (
        <Demo>
            <Prompt title="Relative Position Table" instructions="Answer the questions to move to the next page."/>

            <Row className="mt-5">
                <Col className="">
                {!isSecondQuestion && 
                <>
                    <h3>First Question</h3>
                    <p className="my-3">
                        You need to <span className="fw-bold">add</span> the item in <span className="fw-bold">line 1 column 2</span> with the item in <span className="fw-bold">column 3 line 3</span>.
                    </p>
                </>}
                {isSecondQuestion && 
                <>
                    <h3>Second Question</h3>
                    <p className="my-3">
                        You need to <span className="fw-bold">multiply</span> the item in <span className="fw-bold">line 2 column 1</span> with the item in <span className="fw-bold">column 3 line 1</span>.
                    </p>
                </>}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={6} className='mx-auto'>
                    <TableView data={currentData}/>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={4} className='mx-auto'>
                    <InputGroup>
                        <Form.Control
                            id='result'
                            placeholder="Result"
                            aria-label="Result"
                            aria-describedby="basic-addon2"
                            value={resultInput}
                            onChange={handleInputChange}
                        />
                        <Button variant="primary" id="button-addon2" onClick={handleValueCheck}>
                            Submit
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6} className="mx-auto mt-4">
                    <Collapse in={error !== ""}>
                        <div><Alert>{error}</Alert></div>
                    </Collapse>
                </Col>
            </Row>
        </Demo>
    );
}

export default TableRelativePosition;
