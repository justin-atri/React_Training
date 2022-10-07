import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

const Table = ({ tableData, category, isPositive }) => {
  const [data] = useState([...tableData]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.group({
      id: `${category}`, // id should be string
      header: () => (
        <span style={{ fontSize: "1.6rem" }}>
          {category}{" "}
          {isPositive === "true" ? (
            <HiTrendingUp style={{ color: "#3C9E54", marginTop: "-0.3rem" }} />
          ) : (
            <HiTrendingDown
              style={{ color: "#C9463F", marginTop: "-0.3rem" }}
            />
          )}
        </span>
      ),
      columns: [
        columnHelper.accessor("title", {
          header: null,
          cell: ({ cell, row }) => (
            <div className="cell-wrapper">
              <Link to={`/${row.original.url}/${row.original.id}`}>
                {`${cell.getValue()}`}{" "}
              </Link>
            </div>
          ),
        }),
        columnHelper.accessor("amount", {
          header: null,
          cell: ({ cell, row }) => (
            <div className="cell-wrapper">
              <Link to={`/${row.original.url}/${row.original.id}`}>
                $ {`${cell.getValue()}`}
              </Link>
            </div>
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
                  <th key={header.id} colSpan={header.colSpan}>
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
