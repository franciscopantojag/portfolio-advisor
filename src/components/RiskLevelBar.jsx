import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRiskLevel } from "../redux/actions";
import data from "../data.json";
import { Link } from "react-router-dom";

export default function RiskLevelBar() {
  const riskLevel = useSelector((state) => state.riskLevel);
  const dispatch = useDispatch();
  const numButtons = {
    arr: data.riskLevels.map((riskLevel) => riskLevel.level),
    click: (index) => dispatch(setRiskLevel(index)),
  };
  return (
    <div className="d-flex">
      <div className="mx-auto d-flex mt-3 pt-4">
        {numButtons.arr.map((buttonLabel, index, arr) => (
          <button
            className={`btn btn-outline-dark d-flex justify-content-start align-items-start p-0 mx-1${
              index === 0 || index === arr.length - 1
                ? " position-relative"
                : ""
            }${riskLevel === buttonLabel ? " btn-dark text-white" : ""}`}
            style={{ width: "45px", height: "45px", fontSize: "1.3rem" }}
            key={index}
            onClick={() => {
              numButtons.click(buttonLabel);
            }}
          >
            {buttonLabel === 1 ? (
              <span
                className="position-absolute left-0 text-warning"
                style={{ top: "-2.2rem" }}
              >
                Low
              </span>
            ) : (
              ""
            )}
            {buttonLabel === arr.length ? (
              <span
                className="position-absolute right-0 text-danger"
                style={{ top: "-2.2rem" }}
              >
                High
              </span>
            ) : (
              ""
            )}
            <p className="my-auto mx-auto">{buttonLabel}</p>
          </button>
        ))}
        <Link
          to="/calculator"
          className={`btn btn-primary d-flex justify-content-start align-items-start mx-2${
            riskLevel ? "" : " disabled"
          }`}
          style={{ fontSize: "1.3rem" }}
        >
          <p className="my-auto mx-auto">Continue</p>
        </Link>
      </div>
    </div>
  );
}
