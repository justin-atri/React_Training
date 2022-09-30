import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";

const TableList = ({ category, apiEndpoint }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // isLoading
      try {
        const response = await axios.get(`${apiEndpoint}`);

        setTableData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (isLoading) return <div>Loading Category: {category}</div>;

  return (
    <React.Fragment>
      <Table tableData={tableData} category={category} />
    </React.Fragment>
  );
};

export default TableList;
