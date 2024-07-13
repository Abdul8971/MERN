import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";
import StatisticsBox from "./StatisticsBox/StatisticsBox";
import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Table() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedMonth, searchInput]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const month = new Date(product.dateOfSale).toLocaleString("default", {
        month: "long",
      });
      return month === selectedMonth && months[page];
    });

    if (searchInput !== "") {
      setFilteredProducts(
        filtered.filter((product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(filtered);
    }
  };

  function handleNextMonth() {
    const currentIndex = months.indexOf(selectedMonth);
    const prevIndex = (currentIndex - 1 + months.length) % months.length;
    setSelectedMonth(months[prevIndex]);
  }

  function handlePrevMonth() {
    const currentIndex = months.indexOf(selectedMonth);
    const nextIndex = (currentIndex + 1) % months.length;
    setSelectedMonth(months[nextIndex]);
  }
  if (error) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <div className="container">
      <header className="navbar">
        <input
          type="text"
          placeholder="Search transaction"
          className="input"
          value={searchInput}
          onChange={handleSearch}
        />
        <a href="#StatisticsBox">Statistics</a>
        <a href="#BarChart">BarChart</a>
        <a href="#PieChart">PieChart</a>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </header>
      <main className="inner-container">
        <section className="table-section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.sold ? "Yes" : "No"}</td>
                  <td>
                    <img src={product.image} alt="" className="table-img" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <h1 style={{ position: "absolute", left: "700px", top: "350px" }}>
              Loading...
            </h1>
          )}
        </section>
        <section id="StatisticsBox">
          {searchInput == "" && loading == false ? (
            <StatisticsBox
              statisticsData={filteredProducts}
              month={selectedMonth}
            />
          ) : (
            ""
          )}
        </section>
        <section id="BarChart">
          {searchInput == "" && loading == false ? (
            <BarChart statisticsData={filteredProducts} month={selectedMonth} />
          ) : (
            ""
          )}
        </section>
        {searchInput == "" && loading == false ? (
          <PieChart statisticsData={filteredProducts} month={selectedMonth} />
        ) : (
          ""
        )}
        <section id="PieChart"></section>
      </main>
      <footer>
        <p>Page No:{months.indexOf(selectedMonth) + 1}</p>
        <div>
          <button className="prev" onClick={handleNextMonth}>
            Previous
          </button>
          <button className="next" onClick={handlePrevMonth}>
            Next
          </button>
        </div>
        <p className="pages">Pages:12</p>
      </footer>
    </div>
  );
}

export default Table;
