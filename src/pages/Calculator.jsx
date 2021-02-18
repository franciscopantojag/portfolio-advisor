import React, { useState } from "react";
import { useSelector } from "react-redux";
import CalculatorTable from "../components/CalculatorTable";
import SingleRiskLevelTable from "../components/SingleRiskLevelTable";

import {
  checkAllValuesInPortfolioCanBeNumbers,
  initialPortfolio,
  calculatePortfolio,
} from "../utils";

export default function Calculator() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const actualRiskLevel = useSelector((state) => state.riskLevel);

  return (
    <div className="my-4 px-3">
      <h2 className="text-center fw-bold mb-4">Personalized Portfolio</h2>

      {actualRiskLevel ? (
        <>
          <div className="mx-auto tablesContainerCalcPage">
            <h4>Risk Level {actualRiskLevel}</h4>
            <SingleRiskLevelTable />
            <div className="d-flex align-items-start">
              <h4 className="my-auto">Please Enter Your Current Portfolio</h4>
              <button
                onClick={() =>
                  setPortfolio((prevPortfolio) =>
                    calculatePortfolio(prevPortfolio, actualRiskLevel)
                  )
                }
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
