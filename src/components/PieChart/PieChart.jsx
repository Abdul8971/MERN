import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ statisticsData, month }) {
  const [category, setCategory] = useState({});

  useEffect(() => {
    const categoryCount = {};
    statisticsData.forEach((element) => {
      if (categoryCount[element.category]) {
        categoryCount[element.category] += 1;
      } else {
        categoryCount[element.category] = 1;
      }
    });
    setCategory(categoryCount);
  }, [statisticsData, month]);

  const data = {
    labels: Object.keys(category),
    datasets: [
      {
        data: Object.values(category),
        backgroundColor: ["aqua", "orange", "purple", "green"],
      },
    ],
  };

  let options = {};

  return (
    <div className="pie-chart-container">
      <div className="pie-chart-wrapper">
        <Pie data={data} options={options} className="pieChart" />
      </div>
    </div>
  );
}

export default PieChart;
