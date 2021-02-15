import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-labels";
import { useSelector } from "react-redux";
import data from "../data.json";

export default function DonutChart() {
  const actualRiskLevel = useSelector((state) => state.riskLevel);
  return (
    <div className="d-flex justify-content-center">
      <Doughnut
        height={500}
        width={500}
        plugins={[ChartDataLabels]}
        options={{
          responsive: false,
          legend: {
            display: false,
          },
          plugins: {
            labels: {
              render: (args) => {
                return args.label;
              },
              fontColor: "#fff",
              fontSize: 15,
            },
          },
        }}
        data={{
          datasets: [
            {
              data:
                typeof actualRiskLevel == "number"
                  ? [
                      data.riskLevels[actualRiskLevel - 1].bonds,
                      data.riskLevels[actualRiskLevel - 1].large_cap,
                      data.riskLevels[actualRiskLevel - 1].mid_cap,
                      data.riskLevels[actualRiskLevel - 1].foreign,
                      data.riskLevels[actualRiskLevel - 1].small_cap,
                    ]
                  : [100],
              backgroundColor: [
                "#0d6efd",
                "#0dcaf0",
                "#fd7e14",
                "#ffc107",
                "#198754",
              ],
            },
          ],
          labels:
            typeof actualRiskLevel == "number"
              ? data.Investment_Categories.map(
                  (invCategory, index) => invCategory
                )
              : ["select a risk level"],
        }}
      />
    </div>
  );
}
