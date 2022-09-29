import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Table = ({ tableData, category }) => {
  const [data] = useState([...tableData]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.group({
      id: `${category}`, // id should be string
      header: () => <span>{category}</span>,
      columns: [
        columnHelper.accessor("title", {
          header: null,
          size: 150,
          cell: ({ cell, row }) => (
            <Link
              to={`/${row.original.category}/${row.original.id}`}
            >{`${cell.getValue()}`}</Link>
          ),
        }),
        columnHelper.accessor("amount", {
          header: null,
          size: 60,
          cell: ({ cell, row }) => (
            <Link
              to={`/${row.original.category}/${row.original.id}`}
            >{`${cell.getValue()}`}</Link>
          ),
        }),
      ],
    }),
  ];

  const reactTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
