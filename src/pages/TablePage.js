import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../components/Table";

const TablePage = () => {
  const [loadedMiscTable, setLoadedMiscTable] = useState();
  const [loadedFoodTable, setLoadedFoodTable] = useState();

  // Load Misc table on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/misc");

        const miscTable = response.data;

        setLoadedMiscTable(miscTable);
      } catch (error) {}
    };

    fetchData();
  }, []);

  // Load Food table on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/food");

        const foodTable = response.data;

        setLoadedFoodTable(foodTable);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Link to="/create">
        <button>+</button>
      </Link>

      {/* Only render Table when loadedTable exist */}
      {loadedFoodTable && <Table tableData={loadedFoodTable} category="Food" />}
      {loadedMiscTable && (
        <Table tableData={loadedMiscTable} category="Miscellaneous" />
      )}
    </React.Fragment>
  );
};

export default TablePage;
