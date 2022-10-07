import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";

const TableList = ({ category, apiEndpoint, setTotal, isPositive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [tableTotal, setTableTotal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // isLoading
      try {
        const response = await axios.get(`${apiEndpoint}`);
        const data = response.data;
        // console.log(data);

        // update table data state
        setTableData(data);

        // update total amount state
        let total = 0;
        for (let item of data) {
          let itemAmount = Number(item.amount);
          total += itemAmount;
        }
        setTableTotal(total.toFixed(2));

        // send total value to parent state for overview panel
        // update asset overview
        setTotal(total);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [apiEndpoint, setTotal]);

  if (isLoading) return <div>Loading Category: {category}</div>;

  return (
    <React.Fragment>
      <div className="table-container">
        <Table
          tableData={tableData}
          category={category}
          isPositive={isPositive}
        />
        <div className="table-total">Total: $ {tableTotal}</div>
      </div>
    </React.Fragment>
  );
};

export default TableList;
