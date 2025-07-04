import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Collapse, Alert, Row, Col, Table } from 'react-bootstrap';

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
        <Layout
            title="Dynamic Table"
            description="The rows of the table below change order every time the page is refreshed."
        >
            <Row className="mt-5 demo-content">
                <Col>
                    <Table className="text-start dynamic-table" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Superhero Name</th>
                                <th>Real Name</th>
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
                    </Table>
                </Col>
            </Row>
        </Layout>
    );
}

export default DynamicTable;
