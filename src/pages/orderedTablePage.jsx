import React, { useState } from "react";
import Layout from "../components/Layout";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import OrderedTable from "../components/orderedTable";
import { Eye } from "react-bootstrap-icons";

const OrderedTablePage = () => {
  const tables = [
    {
      data: [
        {
          id: 1,
          name: "Alfred",
          balance: 5000,
          status: "active",
          birthdate: "1980-01-15",
        },
        {
          id: 2,
          name: "Brenda",
          balance: 3000,
          status: "inactive",
          birthdate: "1990-05-22",
        },
        {
          id: 3,
          name: "Charles",
          balance: 7000,
          status: "active",
          birthdate: "1975-09-10",
        },
        {
          id: 4,
          name: "Diana",
          balance: 2000,
          status: "active",
          birthdate: "1985-12-30",
        },
        {
          id: 5,
          name: "Edward",
          balance: 6000,
          status: "inactive",
          birthdate: "1992-07-08",
        },
        {
          id: 6,
          name: "Fiona",
          balance: 4000,
          status: "active",
          birthdate: "1988-03-14",
        },
        {
          id: 7,
          name: "George",
          balance: 8000,
          status: "active",
          birthdate: "1970-11-25",
        },
      ],
      columns: [
        {
          accessorKey: "id",
          header: "ID",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "name",
          header: "Name",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "balance",
          header: "Balance",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "birthdate",
          header: "Birth Date",
          cell: (props) => <p>{props.getValue()}</p>,
        },
      ],
    },
    {
      data: [
        {
          action: "view",
          assetName: "GL Account Reconciliation using Blue Prism",
          assetId: 4026,
          assetVersionId: 4026,
          status: "Approved",
          submittedDate: "Nov 13, 2018 3:54:19 PM",
        },
        {
          action: "view",
          assetName: "Smarter - excel add-in",
          assetId: 6248,
          assetVersionId: 6248,
          status: "In Progress",
          submittedDate: "Jan 21, 2019 4:53:22 PM",
        },
        {
          action: "view",
          assetName: "Fathom Enterprise Search - Automated and Smart Search",
          assetId: 7916,
          assetVersionId: 7916,
          status: "In Progress",
          submittedDate: "Mar 7, 2019 2:10:18 PM",
        },
        {
          action: "view",
          assetName:
            "Entity and Sentiment Analysis using Google's NLP Engine and Blue Prism",
          assetId: 8174,
          assetVersionId: 8174,
          status: "Approved",
          submittedDate: "Mar 14, 2019 1:56:29 PM",
        },
        {
          action: "view",
          assetName: "Automation Anywhere - Save As Internet Explorer Microbot",
          assetId: 8266,
          assetVersionId: 8266,
          status: "Rejected",
          submittedDate: "Mar 18, 2019 11:22:12 AM",
        },
        {
          action: "view",
          assetName: "Automation Anywhere - Sample/Example Main Task",
          assetId: 8279,
          assetVersionId: 8279,
          status: "Rejected",
          submittedDate: "Mar 18, 2019 1:58:59 PM",
        },
        {
          action: "view",
          assetName: "Test 4-24 bp",
          assetId: 10548,
          assetVersionId: 10548,
          status: "Rejected",
          submittedDate: "Apr 24, 2019 1:28:23 PM",
        },
        {
          action: "view",
          assetName: "test Sam's 2019",
          assetId: 11284,
          assetVersionId: 11284,
          status: "In Progress",
          submittedDate: "May 14, 2019 1:57:52 PM",
        },
        {
          action: "view",
          assetName:
            "Word Cloud Generator and Keyword Sentiment Analysis using Twitter API, Google NLP API and Word Cloud API",
          assetId: 11522,
          assetVersionId: 11522,
          status: "Approved",
          submittedDate: "May 17, 2019 2:03:01 PM",
        },
        {
          action: "view",
          assetName:
            "Japanese/English Fixed-Length File Splitting Tool (Create new in Power Workbook Category)",
          assetId: 15540,
          assetVersionId: 15540,
          status: "In Progress",
          submittedDate: "Nov 12, 2019 5:39:03 PM",
        },
        {
          action: "view",
          assetName: "Color my Calendar",
          assetId: 15613,
          assetVersionId: 16435,
          status: "In Progress",
          submittedDate: "Jan 10, 2020 7:19:33 AM",
        },
        {
          action: "view",
          assetName: "Your Current Utilization",
          assetId: 6401,
          assetVersionId: 19460,
          status: "Approved",
          submittedDate: "Feb 10, 2021 8:43:53 AM",
        },
        {
          action: "view",
          assetName: "asjhcajsc a",
          assetId: 39034,
          assetVersionId: 43186,
          status: "Approved",
          submittedDate: "Oct 5, 2021 8:39:50 AM",
        },
        {
          action: "view",
          assetName: "asclj sacas",
          assetId: 39072,
          assetVersionId: 43226,
          status: "In Progress",
          submittedDate: "Oct 6, 2021 2:36:17 AM",
        },
        {
          action: "view",
          assetName: "slk jcasjscbasakc",
          assetId: 39074,
          assetVersionId: 43322,
          status: "Rejected",
          submittedDate: "Oct 6, 2021 2:46:19 AM",
        },
        {
          action: "view",
          assetName: "ASLJCKAS KCAS",
          assetId: 39078,
          assetVersionId: 43232,
          status: "Approved",
          submittedDate: "Oct 6, 2021 3:08:05 AM",
        },
        {
          action: "view",
          assetName: "ASLJCKAS KCASA",
          assetId: 39079,
          assetVersionId: 42393,
          status: "In Progress",
          submittedDate: "Oct 6, 2021 3:22:27 AM",
        },
        {
          action: "view",
          assetName: "Sanjaya_test1234",
          assetId: 39154,
          assetVersionId: 43239,
          status: "Rejected",
          submittedDate: "Oct 6, 2021 11:49:31 PM",
        },
        {
          action: "view",
          assetName: "askcjascbkjasncasc",
          assetId: 39155,
          assetVersionId: 43310,
          status: "Approved",
          submittedDate: "Oct 6, 2021 11:54:03 PM",
        },
        {
          action: "view",
          assetName: "ckjhiasc as",
          assetId: 39162,
          assetVersionId: 43317,
          status: "Approved",
          submittedDate: "Oct 7, 2021 12:23:45 AM",
        },
        {
          action: "view",
          assetName: "dbkcasijccasbc",
          assetId: 39170,
          assetVersionId: 43325,
          status: "In Progress",
          submittedDate: "Oct 7, 2021 1:51:59 AM",
        },
      ],

      columns: [
        {
          accessorKey: "action",
          header: "Action",
          cell: () => <Eye size={22} />,
          enableSorting: false,
        },
        {
          accessorKey: "assetName",
          header: "Asset Name",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "assetId",
          header: "Asset ID",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "assetVersionId",
          header: "Version ID",
          cell: (props) => <p>{props.getValue()}</p>,
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: (props) => {
            const value = props.getValue();
            const colorMap = {
              Approved: "#28a745", // green
              "In Progress": "#ffc107", // yellow
              Rejected: "#dc3545", // red
            };

            return (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: colorMap[value] || "#6c757d",
                  }}
                ></div>

                <span>{value}</span>
              </div>
            );
          },
        },
        {
          accessorKey: "submittedDate",
          header: "Submitted Date",
          cell: (props) => <p>{props.getValue()}</p>,
        },
      ],
    },
    {
      data: [
        {
          id: 1,
          name: "Alice",
          age: 9,
          score: 91,
          priority: 1,
          reversed: 5,
          same: 1,
        },
        {
          id: 2,
          name: "Bob",
          age: 8,
          score: 95,
          priority: 2,
          reversed: 4,
          same: 1,
        },
        {
          id: 3,
          name: "Charlie",
          age: 15,
          score: 92,
          priority: 2,
          reversed: 4,
          same: 1,
        },
        {
          id: 4,
          name: "Diana",
          age: 22,
          score: 91,
          priority: 3,
          reversed: 3,
          same: 1,
        },
        {
          id: 5,
          name: "Ethan",
          age: 29,
          score: 85,
          priority: 3,
          reversed: 3,
          same: 1,
        },
        {
          id: 6,
          name: "Fiona",
          age: 31,
          score: 79,
          priority: 3,
          reversed: 2,
          same: 1,
        },
        {
          id: 7,
          name: "George",
          age: 37,
          score: 73,
          priority: 4,
          reversed: 1,
          same: 1,
        },
        {
          id: 8,
          name: "Helen",
          age: 42,
          score: 67,
          priority: 5,
          reversed: 0,
          same: 1,
        },
      ],
      columns: [
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "age",
          header: "Age",
        },
        {
          accessorKey: "score",
          header: "Score",
        },
        {
          accessorKey: "priority",
          header: "Priority",
        },
        {
          accessorKey: "reversed",
          header: "Reversed",
        },
        {
          accessorKey: "same",
          header: "Same",
        },
      ],
    },
  ];

  const [currentTableIndex, setCurrentTableIndex] = useState(1);

  return (
    <Layout
      title="Ordered Table"
      description="View and switch between sortable sample tables"
    >
      <Row>
        <ButtonGroup>
          <Button
            variant={currentTableIndex === 0 ? "primary" : "secondary"}
            onClick={() => setCurrentTableIndex(0)}
          >
            Table 1
          </Button>

          <Button
            variant={currentTableIndex === 1 ? "primary" : "secondary"}
            onClick={() => setCurrentTableIndex(1)}
          >
            Table 2
          </Button>

          <Button
            variant={currentTableIndex === 2 ? "primary" : "secondary"}
            onClick={() => setCurrentTableIndex(2)}
          >
            Table 3
          </Button>
        </ButtonGroup>
      </Row>
      <Row className="mt-5">
        <OrderedTable
          data={tables[currentTableIndex].data}
          columns={tables[currentTableIndex].columns}
        />
      </Row>
    </Layout>
  );
};

export default OrderedTablePage;
