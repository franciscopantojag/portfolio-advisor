import React from "react";
import { useSelector } from "react-redux";
import data from "../data.json";

export default function RiskLevelTable() {
  const actualRiskLevel = useSelector((state) => state.riskLevel);

  return (
    <table className="table text-center mx-auto table-bordered">
      <thead>
        <tr className="table-light">
          <th scope="col" style={{ textAlign: "left" }}>
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
        {data.riskLevels.map((riskLevel, index) => (
          <tr
            className={`${
              actualRiskLevel === riskLevel.level ? "table-dark" : ""
            }`}
            key={index}
          >
            <th scope="row" style={{ textAlign: "left" }}>
              {riskLevel.level}
            </th>
            <td>{riskLevel.bonds}</td>
            <td>{riskLevel.large_cap}</td>
            <td>{riskLevel.mid_cap}</td>
            <td>{riskLevel.foreign}</td>
            <td>{riskLevel.small_cap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
