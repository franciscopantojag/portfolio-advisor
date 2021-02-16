import React, { useState } from "react";
import { useSelector } from "react-redux";
import CalculatorTable from "../components/CalculatorTable";
import SingleRiskLevelTable from "../components/SingleRiskLevelTable";
import data from "../data.json";
import {
  checkAllValuesInPortfolioCanBeNumbers,
  initialPortfolio,
  calculatePortfolio,
} from "../utils";

export default function Calculator() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const actualRiskLevel = useSelector((state) => state.riskLevel);
  const actualRiskLevelObj = data.riskLevels[actualRiskLevel - 1];

  return (
    <div className="my-4 px-3">
      <h2 className="text-center fw-bold mb-4">Personalized Portfolio</h2>

      {actualRiskLevel ? (
        <>
          <div
            className="mx-auto"
            style={{ maxWidth: "800px", minWidth: "615px" }}
          >
            <h4>Risk Level {actualRiskLevel}</h4>
            <SingleRiskLevelTable />
            <div className="d-flex align-items-start">
              <h4 className="my-auto">Please Enter Your Current Portfolio</h4>
              <button
                onClick={() => {
                  calculatePortfolio(
                    portfolio,
                    setPortfolio,
                    actualRiskLevelObj
                  );
                }}
                className={`btn btn-primary ms-auto my-2${
                  checkAllValuesInPortfolioCanBeNumbers(portfolio)
                    ? ""
                    : " disabled"
                }`}
              >
                Rebalance
              </button>
            </div>
            <CalculatorTable
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          </div>
        </>
      ) : (
        <p className="text-center">Please go home and select a Risk Level</p>
      )}
    </div>
  );
}
