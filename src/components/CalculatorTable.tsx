import React from "react";

import { EntirePortfolio } from "../types";
import {
  labelRiskLevelMapper,
  regexNumberMaxTwoFloatingPoints,
} from "../utils";

const CalculatorTable: React.FC<{
  portfolio: EntirePortfolio;
  setPortfolio: React.Dispatch<React.SetStateAction<EntirePortfolio>>;
}> = ({ portfolio, setPortfolio }) => {
  function stringLiterals<T extends string>(...args: T[]): T[] {
    return args;
  }

  const values = stringLiterals(
    "Bonds",
    "Large Cap",
    "Mid Cap",
    "Foreign",
    "Small Cap"
  );

  const currentPortfolioKeys = [
    "Current Amount",
    "Difference",
    "New Amount",
    "Recommendations",
  ];
  const handleChange = (
    portfolioProp: keyof typeof portfolio.portfolio,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const regex = regexNumberMaxTwoFloatingPoints;
    if (!regex.test(value)) {
      return;
    }
    setPortfolio((prev) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        [portfolioProp]: {
          ...prev.portfolio[portfolioProp],
          old: value,
        },
      },
    }));
  };
  return (
    <table className="table table-bordered text-center mt-2 mb-3">
      <thead>
        <tr className="table-light text-center">
          {currentPortfolioKeys.map((key, index) => (
            <th className="align-middle" key={index}>
              {key.toString().toLowerCase() === "current amount"
                ? `${key} ($)`
                : key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((category, index, arr) => (
          <tr key={index}>
            <th className="align-middle text-start" scope="row">
              <div className="d-flex justify-content-between align-items-start inputCalculatorDiv">
                <span className="my-auto me-3"> {category}:</span>{" "}
                <input
                  onChange={(e) =>
                    handleChange(labelRiskLevelMapper[category], e)
                  }
                  value={
                    portfolio.portfolio[labelRiskLevelMapper[category]].old
                  }
                  type="text"
                  className="form-control my-auto p-2"
                />
              </div>
            </th>
            <td className="align-middle">
              <p
                className={`p-1 border border-1 rounded my-auto bg-light mx-auto overflow-auto paragraphNumberCalculatorTable${
                  typeof portfolio.portfolio[labelRiskLevelMapper[category]]
                    .difference === "number"
                    ? portfolio.portfolio[labelRiskLevelMapper[category]]
                        .difference < 0
                      ? " text-danger"
                      : portfolio.portfolio[labelRiskLevelMapper[category]]
                          .difference > 0
                      ? " text-success"
                      : ""
                    : ""
                }`}
              >
                {typeof portfolio.portfolio[labelRiskLevelMapper[category]]
                  .difference === "number"
                  ? portfolio.portfolio[labelRiskLevelMapper[category]]
                      .difference > 0
                    ? `+${Number(
                        portfolio.portfolio[labelRiskLevelMapper[category]]
                          .difference
                      ).toFixed(2)}`
                    : Number(
                        portfolio.portfolio[labelRiskLevelMapper[category]]
                          .difference
                      ).toFixed(2)
                  : ""}
              </p>
            </td>
            <td className="align-middle">
              <p className="p-1 border border-1 rounded my-auto bg-light mx-auto overflow-auto paragraphNumberCalculatorTable">
                {typeof portfolio.portfolio[labelRiskLevelMapper[category]]
                  .new === "number"
                  ? Number(
                      portfolio.portfolio[labelRiskLevelMapper[category]].new
                    ).toFixed(2)
                  : ""}
              </p>
            </td>
            {index === 0 ? (
              <td
                className="border border-1 rounded p-3 m-auto recommendationsCell"
                rowSpan={arr.length}
              >
                <ul className="mb-0 text-start ps-3">
                  {Array.isArray(portfolio.arr)
                    ? portfolio.arr.map((a, index, thisArr) => (
                        <li
                          className={`${
                            index === thisArr.length - 1 ? "" : " mb-2"
                          }`}
                          key={index}
                        >
                          <span className="overflow-auto">{a}</span>
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
};
export default CalculatorTable;
