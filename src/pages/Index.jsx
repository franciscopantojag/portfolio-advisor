import React, { useState } from "react";
import DonutChart from "../components/DonutChart";

import RiskLevelBar from "../components/RiskLevelBar";
import RiskLevelTable from "../components/RiskLevelTable";

export default function Index() {
  const [table, setTable] = useState(true);
  const toggleTable = () => setTable((prev) => !prev);
  return (
    <div className="my-3 mx-3">
      <h3 className="text-center">
        Please select a risk level for your portfolio
      </h3>
      <RiskLevelBar />
      <div className="mt-4 position-relative mx-auto max-w-700">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h3 className="mb-0">Distribution</h3>
          <button
            onClick={() => toggleTable()}
            className="btn btn-primary top-0 end-0"
          >
            Toggle
          </button>
        </div>

        <div>{table ? <RiskLevelTable /> : <DonutChart />}</div>
      </div>
    </div>
  );
}
