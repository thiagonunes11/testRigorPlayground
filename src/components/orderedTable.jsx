import { Table } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowDownUp } from "react-bootstrap-icons";

const OrderedTable = (props) => {
  const columns = props.columns || [];
  const data = props.data || [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getSortIcon = (column) => {
    if (!column.getCanSort()) return null;

    const direction = column.getIsSorted(); // 'asc' | 'desc' | false

    if (!direction) return <ArrowDownUp size={14} className="ms-1" />;
    if (direction === "asc") return <ArrowUp size={14} className="ms-1" />;
    return <ArrowDown size={14} className="ms-1" />;
  };

  return (
    <Table className="text-start dynamic-table" striped bordered hover>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                style={{
                  cursor: header.column.getCanSort() ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                {header.column.columnDef.header}
                {getSortIcon(header.column)}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderedTable;
