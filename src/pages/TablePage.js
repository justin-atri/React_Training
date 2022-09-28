import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

const TablePage = () => {
  const [loadedTable, setLoadedTable] = useState();

  // Load table data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/misc");

        const tableData = response.data;

        setLoadedTable(tableData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const createHandler = () => {
    navigate("/create");
  };

  return (
    <React.Fragment>
      <button onClick={createHandler}>+</button>

      {/* Only render Table when loadedTable exist */}
      {loadedTable && (
        <Table tableData={loadedTable} category="Miscellaneous" />
      )}
    </React.Fragment>
  );
};

export default TablePage;
