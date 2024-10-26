import React, { useEffect, useState } from "react";

const StockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/stock-data");
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter stock data based on search query
  const filteredStockData = stockData.filter((stock) =>
    stock.stock_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (!stockData.length) return <div>No data available</div>;

  return (
    <div className="bg-gray-200 p-8 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        High Volume Dashboard
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by stock name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-1/2"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-10 lg:px-60">
        {filteredStockData.map((stock, index) => (
          <div
            key={index}
            className={`p-4 bg-white rounded-lg shadow-lg border-b-4 ${
              stock.chg_percentage > 0 ? "border-green-500" : "border-red-500"
            } relative`}
          >
            {/* Stock Ticker */}
            <span
              className={`text-xs font-bold px-2 py-1 rounded text-white absolute top-2 left-2 ${
                stock.chg_percentage > 0 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {stock.stock}
            </span>

            {/* Stock Name */}
            <h3 className="text-lg font-semibold mt-6 text-left">
              {stock.stock_name}
            </h3>

            {/* Stock Price */}
            <p className="text-3xl font-bold mt-2 text-left">₹{stock.price}</p>

            {/* Change Percentage */}
            <div className="mt-2 flex">
              <div
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  stock.chg_percentage > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span className="mr-1">
                  {stock.chg_percentage > 0 ? "▲" : "▼"}
                </span>
                <span>{Math.abs(stock.chg_percentage)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockData;
