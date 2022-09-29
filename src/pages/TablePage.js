import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../components/Table";

const TablePage = () => {
  return (
    <React.Fragment>
      <Link to="/create">
        <button>+</button>
      </Link>

      {/* pass in the paramiter foward slash together in this case */}
      <CategoryTable category="Food" apiEndpoint="/food" />
      <CategoryTable category="Miscellaneous" apiEndpoint="/misc" />
    </React.Fragment>
  );
};

const CategoryTable = ({ category, apiEndpoint }) => {
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
    <>
      <Table tableData={tableData} category={category} />
    </>
  );
};

export default TablePage;
