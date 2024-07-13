import React, { useState, useEffect } from "react";
import "./StatisticsBox.css";
function StatisticsBox({ statisticsData, month }) {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    let totalSales = 0;
    let soldItems = 0;
    let notSoldItems = 0;

    statisticsData.forEach((product) => {
      if (product.sold) {
        totalSales += product.price;
        soldItems++;
      } else {
        notSoldItems++;
      }
    });

    setStatistics({
      totalSales,
      soldItems,
      notSoldItems,
    });
  }, [statisticsData]);

  return (
    <div className="statistics-container">
      <div className="statistics-innerContainer">
        <h3>Statistics for {month}</h3>
        <p>Total Sales: ${statistics.totalSales}</p>
        <p>Sold Items: {statistics.soldItems}</p>
        <p>Not Sold Items: {statistics.notSoldItems}</p>
      </div>
    </div>
  );
}

export default StatisticsBox;
