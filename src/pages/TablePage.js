import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableList from "../components/TableList";

const TablePage = ({ userName }) => {
  const [netPositive, setNetPositive] = useState(0);
  const [netNegative, setNetNegative] = useState(0);
  const [netOutcome, setNetOutcome] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);

  const [foodTotal, setFoodTotal] = useState(0);
  const [miscTotal, setMiscTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);

  useEffect(() => {
    setNetPositive(incomeTotal.toFixed(2));
    setNetNegative((foodTotal + miscTotal).toFixed(2));
    setNetOutcome((Number(netPositive) - Number(netNegative)).toFixed(2));
    setTotalAsset((3433.53 + Number(netOutcome)).toFixed(2));
  }, [foodTotal, incomeTotal, miscTotal, netNegative, netOutcome, netPositive]);

  return (
    <React.Fragment>
      <div className="table-page__container">
        <span className="topline">{userName}'s Finance Overview</span>
        <div className="header">
          <h2>September 2022</h2>
        </div>
        <div className="overview-row">
          <div>
            <p className="asset-title">Net Positive</p>
            <div className="asset-box green">
              <span className="dollar-sign">$</span>
              <span>{netPositive}</span>
            </div>
          </div>
          <div>
            <p className="asset-title">Net Negative</p>
            <div className="asset-box red">
              <span className="dollar-sign">$</span>
              <span>{netNegative}</span>
            </div>
          </div>
          <div>
            <p className="asset-title">Net Outcome</p>
            <div className="asset-box blue">
              <span className="dollar-sign">$</span>
              <span>{netOutcome}</span>
            </div>
          </div>
          <div>
            <p className="asset-title">Total Asset</p>
            <div className="asset-box blue">
              <span className="dollar-sign">$</span>
              <span>{totalAsset}</span>
            </div>
          </div>
        </div>
        <section>
          <div className="table-list__container">
            <Link to="/create">
              <button data-cy="create-btn">+</button>
            </Link>

            {/* pass in the paramiter foward slash together in this case */}
            <div className="table-list__wrapper">
              <TableList
                category="Income"
                apiEndpoint="/income"
                setTotal={setIncomeTotal}
                isPositive="true"
              />
              <TableList
                category="Food"
                apiEndpoint="/food"
                setTotal={setFoodTotal}
                isPositive="false"
              />
              <TableList
                category="Miscellaneous"
                apiEndpoint="/misc"
                setTotal={setMiscTotal}
                isPositive="false"
              />
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default TablePage;
