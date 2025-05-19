import React from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';

const DivTable = () => {
  return (
    <Layout
      title="HTML Div Table"
      description="Verify contents of table below."
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="divTable blueTable">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">head1</div>
                <div className="divTableHead">head2</div>
                <div className="divTableHead">head3</div>
              </div>
            </div>
            <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableCell">ABC</div>
                <div className="divTableCell">DEF</div>
                <div className="divTableCell">GHI</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">QWE</div>
                <div className="divTableCell">RTY</div>
                <div className="divTableCell">UIO</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">MNB</div>
                <div className="divTableCell">VCX</div>
                <div className="divTableCell">ASD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DivTable;