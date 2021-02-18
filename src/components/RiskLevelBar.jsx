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
    click: (riskLevel) => dispatch(setRiskLevel(riskLevel)),
  };
  return (
    <div className="d-flex">
      <div className="mx-auto d-flex mt-3 pt-4">
        {numButtons.arr.map((buttonLabel, index, arr) => (
          <button
            className={`btn btn-outline-dark p-0 mx-1 riskLevelBarButton${
              index === 0 || index === arr.length - 1
                ? " position-relative"
                : ""
            }${riskLevel === buttonLabel ? " btn-dark text-white" : ""}`}
            key={index}
            onClick={() => {
              numButtons.click(buttonLabel);
            }}
          >
            {buttonLabel === 1 ? (
              <span className="position-absolute start-0 text-warning top-2point2rem-negative">
                Low
              </span>
            ) : (
              ""
            )}
            {buttonLabel === arr.length ? (
              <span className="position-absolute end-0 text-danger top-2point2rem-negative">
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
          className={`btn btn-primary mx-2 continue-button${
            riskLevel ? "" : " disabled"
          }`}
        >
          <p className="my-auto mx-auto">Continue</p>
        </Link>
      </div>
    </div>
  );
}
