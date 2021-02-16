import React from "react";
import data from "../data.json";
import { lavelRiskLevelMapper } from "../utils";

export default function CalculatorTable({ portfolio, setPortfolio }) {
  const currentPortfolioKeys = [
    "Current Amount",
    "Difference",
    "New Amount",
    "Recommendations",
  ];
  const handleChange = (portfolioProp, event) => {
    setPortfolio((prev) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        [portfolioProp]: {
          ...prev.portfolio[portfolioProp],
          old: event.target.value,
        },
      },
    }));
  };
  return (
    <table className="table table-bordered text-center my-3">
      <thead>
        <tr className="table-light text-center">
          {currentPortfolioKeys.map((key, index) => (
            <th key={index}>
              {key.toString().toLowerCase() === "current amount"
                ? `${key} ($)`
                : key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.Investment_Categories.map((category, index, arr) => (
          <tr key={index}>
            <th
              scope="row"
              style={{
                minWidth: "12rem",
                verticalAlign: "middle",
                textAlign: "left",
              }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <span className="my-auto me-3"> {category}</span>{" "}
                <input
                  onChange={(e) =>
                    handleChange(lavelRiskLevelMapper[category], e)
                  }
                  value={
                    portfolio.portfolio[lavelRiskLevelMapper[category]].old
                  }
                  style={{ maxWidth: "6rem", height: "34px" }}
                  type="text"
                  className="form-control my-auto"
                />
              </div>
            </th>
            <td style={{ verticalAlign: "middle" }}>
              <p
                style={{
                  minWidth: "7rem",
                  minHeight: "34px",
                  maxWidth: "8rem",
                  overflow: "auto",
                }}
                className={`p-1 border border-1 rounded my-auto bg-light mx-auto${
                  typeof portfolio.portfolio[lavelRiskLevelMapper[category]]
                    .difference === "number"
                    ? portfolio.portfolio[lavelRiskLevelMapper[category]]
                        .difference < 0
                      ? " text-danger"
                      : portfolio.portfolio[lavelRiskLevelMapper[category]]
                          .difference > 0
                      ? " text-success"
                      : ""
                    : ""
                }`}
              >
                {typeof portfolio.portfolio[lavelRiskLevelMapper[category]]
                  .difference === "number"
                  ? portfolio.portfolio[lavelRiskLevelMapper[category]]
                      .difference > 0
                    ? `+${portfolio.portfolio[
                        lavelRiskLevelMapper[category]
                      ].difference.toFixed(2)}`
                    : portfolio.portfolio[
                        lavelRiskLevelMapper[category]
                      ].difference.toFixed(2)
                  : ""}
              </p>
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p
                style={{
                  minWidth: "7rem",
                  minHeight: "34px",
                  maxWidth: "8rem",
                  overflow: "auto",
                }}
                className="p-1 border border-1 rounded my-auto bg-light mx-auto"
              >
                {typeof portfolio.portfolio[lavelRiskLevelMapper[category]]
                  .new === "number"
                  ? portfolio.portfolio[
                      lavelRiskLevelMapper[category]
                    ].new.toFixed(2)
                  : ""}
              </p>
            </td>
            {index === 0 ? (
              <td
                className="border border-1 rounded p-3 m-auto"
                style={{
                  verticalAlign: "middle",
                  minHeight: "15rem",
                  maxWidth: "160px",
                }}
                rowSpan={arr.length}
              >
                <ul className="mb-0 text-start ps-3">
                  {Array.isArray(portfolio.arr)
                    ? portfolio.arr.map((a, index, thisArr) => (
                        <li
                          className={`${
                            index === thisArr.length - 1 ? "" : "mb-2"
                          }`}
                          key={index}
                        >
                          {a}
                        </li>
                      ))
                    : ""}
                </ul>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
