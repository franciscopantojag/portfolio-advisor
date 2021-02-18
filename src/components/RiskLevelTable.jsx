import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRiskLevel } from "../redux/actions";
import data from "../data.json";

export default function RiskLevelTable() {
  const actualRiskLevel = useSelector((state) => state.riskLevel);
  const dispatch = useDispatch();
  const setRiskLevelClick = (riskLevel) => dispatch(setRiskLevel(riskLevel));
  return (
    <table className="table text-center mx-auto table-bordered align-middle">
      <thead>
        <tr className="table-light">
          <th className="text-start align-middle" scope="col">
            Level
          </th>
          {data.Investment_Categories.map((invCategory, index) => (
            <th className="align-middle" key={index} scope="col">
              <span>{invCategory} %</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.riskLevels.map((riskLevel, index) => (
          <tr
            onClick={() => setRiskLevelClick(riskLevel.level)}
            className={`cursor-pointer ${
              actualRiskLevel === riskLevel.level ? "table-dark" : ""
            }`}
            key={index}
          >
            <th className="align-middle text-start" scope="row">
              {riskLevel.level}
            </th>
            <td className="align-middle">{riskLevel.bonds}</td>
            <td className="align-middle">{riskLevel.large_cap}</td>
            <td className="align-middle">{riskLevel.mid_cap}</td>
            <td className="align-middle">{riskLevel.foreign}</td>
            <td className="align-middle">{riskLevel.small_cap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
