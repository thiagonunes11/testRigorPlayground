import React from 'react';
import Layout from '../components/Layout';
import { Row, Col, Table } from 'react-bootstrap';
import '../styles/homePage.css';

const DivTable = () => {
  return (
    <Layout
      title="HTML Div Table"
      description="Verify contents of table below."
    >
      <Row className="mt-5 demo-content">
        <Col>
          <Table className="text-start dynamic-table" striped bordered hover>
            <thead>
              <tr>
                <th>head1</th>
                <th>head2</th>
                <th>head3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ABC</td>
                <td>DEF</td>
                <td>GHI</td>
              </tr>
              <tr>
                <td>QWE</td>
                <td>RTY</td>
                <td>UIO</td>
              </tr>
              <tr>
                <td>MNB</td>
                <td>VCX</td>
                <td>ASD</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Layout>
  );
};

export default DivTable;