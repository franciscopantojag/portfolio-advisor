import React, { useState } from "react";
import { useSelector } from "react-redux";
import data from "../data.json";
import {
  lavelRiskLevelMapper,
  checkAllValuesInPortfolioCanBeNumbers,
  initialPortfolio,
} from "../utils";
export default function Calculator() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const actualRiskLevel = useSelector((state) => state.riskLevel);
  const actualRiskLevelObj = data.riskLevels[actualRiskLevel - 1];
  const currentPortfolioKeys = [
    "Current Amount",
    "Difference",
    "New Amount",
    "Recommendations",
  ];
  const calculate = () => {
    if (!checkAllValuesInPortfolioCanBeNumbers(portfolio)) {
      return;
    }
    let total = 0;
    for (let key in portfolio) {
      total += parseFloat(portfolio[key].old);
    }
    for (let key in portfolio) {
      setPortfolio((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          new: total * (actualRiskLevelObj[key] / 100),
          difference:
            total * (actualRiskLevelObj[key] / 100) - parseFloat(prev[key].old),
        },
      }));
    }
  };
  const handleChange = (portfolioProp, event) => {
    setPortfolio((prev) => ({
      ...prev,
      [portfolioProp]: { ...prev[portfolioProp], old: event.target.value },
    }));
  };
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
            <table className="table table-bordered mb-4">
              <thead>
                <tr className="table-light text-end">
                  <th scope="col" style={{ textAlign: "center" }}>
                    Level
                  </th>
                  {data.Investment_Categories.map((invCategory, index) => (
                    <th key={index} scope="col">
                      <span>{invCategory} %</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="text-end">
                  <th scope="row" style={{ textAlign: "center" }}>
                    {actualRiskLevelObj.level}
                  </th>
                  <td>{actualRiskLevelObj.bonds}</td>
                  <td>{actualRiskLevelObj.large_cap}</td>
                  <td>{actualRiskLevelObj.mid_cap}</td>
                  <td>{actualRiskLevelObj.foreign}</td>
                  <td>{actualRiskLevelObj.small_cap}</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex align-items-start">
              <h4 className="my-auto">Please Enter Your Current Portfolio</h4>
              <button
                onClick={() => calculate()}
                className={`btn btn-primary ms-auto my-2${
                  checkAllValuesInPortfolioCanBeNumbers(portfolio)
                    ? ""
                    : " disabled"
                }`}
              >
                Rebalance
              </button>
            </div>

            <table className="table text-center table-bordered my-3">
              <thead>
                <tr className="table-light text-center">
                  {currentPortfolioKeys.map((key, index) => (
                    <th key={index}>{index === 0 ? `${key} ($)` : key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.Investment_Categories.map((category, index) => (
                  <tr key={index}>
                    <th
                      scope="row"
                      className="d-flex justify-content-between align-items-start m-0"
                      style={{ minWidth: "12rem" }}
                    >
                      <span> {category}</span>{" "}
                      <input
                        onChange={(e) =>
                          handleChange(lavelRiskLevelMapper[category], e)
                        }
                        value={portfolio[lavelRiskLevelMapper[category]].old}
                        style={{ maxWidth: "5rem" }}
                        type="text"
                      />
                    </th>
                    <td>
                      <input
                        value={
                          typeof portfolio[lavelRiskLevelMapper[category]]
                            .difference === "number"
                            ? portfolio[
                                lavelRiskLevelMapper[category]
                              ].difference.toFixed(2)
                            : ""
                        }
                        disabled
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        value={
                          typeof portfolio[lavelRiskLevelMapper[category]]
                            .new === "number"
                            ? portfolio[
                                lavelRiskLevelMapper[category]
                              ].new.toFixed(2)
                            : ""
                        }
                        type="text"
                      />
                    </td>
                    <td>
                      <input disabled type="text" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center">Please go home and select a Risk Level</p>
      )}
    </div>
  );
}
