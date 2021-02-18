import React from "react";
import { useSelector } from "react-redux";
import data from "../data.json";

export default function SingleRiskLevelTable() {
  const actualRiskLevel = useSelector((state) => state.riskLevel);
  const actualRiskLevelObj = data.riskLevels.find(
    (riskObj) => riskObj.level === actualRiskLevel
  );
  return (
    <table className="table table-bordered mb-4">
      <thead>
        <tr className="table-light text-end">
          <th className="text-center" scope="col">
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
          <th scope="row" className="text-center">
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
  );
}
