import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [riskLevel, setRiskLevel] = useState(null);
  const numButtons = {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    click: (index) => setRiskLevel(() => index + 1),
  };
  return (
    <div className="container my-4">
      <h3 className="text-center">
        Please select a risk level for your portfolio
      </h3>
      <div className="d-flex">
        <div className="mx-auto d-flex mt-3 pt-4">
          {numButtons.arr.map((buttonLabel, index, arr) => (
            <button
              className={`btn btn-outline-dark d-flex justify-content-start align-items-start p-0 mx-1${
                index === 0 || index === arr.length - 1
                  ? " position-relative"
                  : ""
              }${riskLevel === index + 1 ? " btn-dark text-white" : ""}`}
              style={{ width: "45px", height: "45px", fontSize: "1.3rem" }}
              key={index}
              onClick={() => {
                numButtons.click(index);
              }}
            >
              {index === 0 ? (
                <span
                  className="position-absolute left-0 text-warning"
                  style={{ top: "-2.2rem" }}
                >
                  Low
                </span>
              ) : (
                ""
              )}
              {index === arr.length - 1 ? (
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
          <button
            className={`btn btn-primary d-flex justify-content-start align-items-start mx-2${
              riskLevel ? "" : " disabled"
            }`}
            style={{ fontSize: "1.3rem" }}
            onClick={numButtons.click}
          >
            <p className="my-auto mx-auto">Continue</p>
          </button>
        </div>
      </div>
      <div>
        <Link to="/calculator">Calculator</Link>
      </div>
    </div>
  );
}
