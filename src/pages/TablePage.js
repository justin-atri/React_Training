import React from "react";
import Table from "../components/Table";

import { mockData } from "../data/mock-data";

const TablePage = () => {
  return (
    <React.Fragment>
      {mockData.map((tableData) => (
        <div key={tableData.id}>
          <Table tableData={tableData} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default TablePage;
