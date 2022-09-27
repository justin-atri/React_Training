import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ tableData }) => {
  const [data, setData] = useState([...tableData.data]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.group({
      id: () => <span>{tableData.category}</span>,
      header: () => <span>{tableData.category}</span>,
      columns: [
        columnHelper.accessor("title", { header: null, size: 150 }),
        columnHelper.accessor("amount", { header: null, size: 60 }),
      ],
    }),
  ];

  const reactTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  const editHandler = () => {
    navigate("/edit");
  };

  return (
    <React.Fragment>
      <section>
        <table>
          <thead>
            {reactTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {reactTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
};
export default Table;
