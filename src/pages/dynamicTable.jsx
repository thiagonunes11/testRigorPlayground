import React, { useEffect, useState } from 'react';
import Prompt from '../components/Prompt.jsx'
import Demo from "../components/Demo.jsx";
import { Collapse, Alert, Row, Col } from 'react-bootstrap';

function DynamicTable() {
    const [shuffledValues, setShuffledValues] = useState([]);

    const table_values = [
        { "superhero_name": "Doctor Strange", "real_name": "Stephen Vincent Strange" },
        { "superhero_name": "Ant-Man", "real_name": "Eric O'Grady" },
        { "superhero_name": "Iron Man", "real_name": "Anthony 'Tony' Stark" },
        { "superhero_name": "Hulk", "real_name": "Robert Bruce Banner" },
        { "superhero_name": "Spider-Man", "real_name": "Peter Parker" },
        { "superhero_name": "Captain America", "real_name": "Steve Rogers" },
        { "superhero_name": "Black Widow", "real_name": "Natasha Alianovna Romanova" },
        { "superhero_name": "Deadpool", "real_name": "Wade Wilson" }
    ];


    useEffect(() => {
        const shuffleArray = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        setShuffledValues(shuffleArray(table_values));
    }, []); 

    return (
        <Demo>
            <Prompt title="Dynamic Table" instructions="The rows of the table below changes order every time the page is refreshed."/>

            <Row className="mt-5">
                <Col className="">
                    <table class="table table-striped text-start">
                        <thead>
                            <tr>
                                <th scope="col">Superhero name</th>
                                <th scope="col">Real name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {shuffledValues.map((item, index) => (
                            <tr key={index}>
                            <td>{item.superhero_name}</td>
                            <td>{item.real_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Demo>
    );
}

export default DynamicTable;
