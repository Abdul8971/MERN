import React from "react";
import { useState } from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ statisticsData, month }) {
  const [barData, setBarData] = useState(statisticsData);

  const data = {
    labels: [
      "0 - 100",
      "101 - 200",
      "201 - 300",
      "301 - 400",
      "401 - 500",
      "501 - 600",
      "601 - 700",
      "701 - 800",
      "801 - 900",
      "901 - above",
    ],
    datasets: [
      {
        labels: "# of Items",
        data: statisticsData.map((range) => range.price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  const options = {};
  return (
    <>
      <Bar data={data} options={options}></Bar>
    </>
  );
}

export default BarChart;
