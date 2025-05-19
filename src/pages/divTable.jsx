import React from 'react';
import Layout from '../components/Layout';

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

      <style jsx>{`
        .divTable.blueTable {
          max-width: 100%;
          margin: 0 auto;
          width: 100%;
          display: table;
          border-collapse: collapse;
          background-color: var(--bs-body-bg);
          color: var(--bs-body-color);
          font-family: var(--bs-body-font-family);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--bs-border-color);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .divTable.blueTable .divTableRow {
          display: table-row;
        }

        .divTable.blueTable .divTableCell,
        .divTable.blueTable .divTableHead {
          display: table-cell;
          padding: 12px;
          text-align: left;
          border: 1px solid var(--bs-border-color);
        }

        .divTable.blueTable .divTableHeading {
          display: table-header-group;
          background: var(--bs-tertiary-bg);
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .divTable.blueTable .divTableHeading .divTableHead {
          border-bottom: 2px solid var(--bs-border-color);
        }

        .divTable.blueTable .divTableBody {
          display: table-row-group;
        }

        .divTable.blueTable .divTableRow:nth-child(even) {
          background: var(--bs-tertiary-bg);
        }

        .divTable.blueTable .divTableRow:hover {
          background: var(--bs-secondary-bg);
          transition: background 0.2s ease-in-out;
        }
      `}</style>
    </Layout>
  );
};

export default DivTable;