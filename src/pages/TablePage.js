import React from "react";
import { Link } from "react-router-dom";
import TableList from "../components/TableList";

const TablePage = () => {
  return (
    <React.Fragment>
      <div className="table-page__container">
        <span className="topline">Jay's Finance Overview</span>
        <div className="header">
          <h2>September 2022</h2>
        </div>
        <section>
          <div className="table-list__container">
            <Link to="/create">
              <button data-cy="create-btn">+</button>
            </Link>

            {/* pass in the paramiter foward slash together in this case */}
            <div className="table-list__wrapper">
              <TableList category="Food" apiEndpoint="/food" />
              <TableList category="Miscellaneous" apiEndpoint="/misc" />
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default TablePage;
