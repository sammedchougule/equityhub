import React, { useEffect, useState } from 'react';

const StockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(() => {
    // Get the count from local storage, or default to 10
    const savedCount = localStorage.getItem('visibleCount');
    return savedCount ? parseInt(savedCount, 10) : 10;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`data/data.json?timestamp=${new Date().getTime()}`, {
          cache: 'no-cache'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 10; // Increase visible count by 10
      localStorage.setItem('visibleCount', newCount); // Store new count in local storage
      return newCount;
    });
  };

  const handleViewLess = () => {
    setVisibleCount((prevCount) => {
      const newCount = Math.max(prevCount - 10, 10); // Decrease visible count by 10 but keep it at least 10
      localStorage.setItem('visibleCount', newCount); // Store new count in local storage
      return newCount;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!stockData.length) return <div>No data available</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-200">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">High Volume Dashboard</h2>

      <div className="flex flex-wrap justify-center gap-4 px-4 sm:px-4 lg:px-32">
          {stockData.slice(0, visibleCount).map((stock, index) => {
            const isPositive = stock.chg_percentage > 0;
            return (
              <div
                key={index}
                className={`p-2 bg-white rounded-lg shadow-lg border-b-4 h-40 w-48 ${
                  isPositive ? 'border-green-500' : 'border-red-500'
                } relative flex flex-col justify-between overflow-hidden basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6`}
              >
                {/* Stock Ticker */}
                <span
                  aria-label={`${stock.stock} ticker`}
                  className={`text-xs font-bold px-2 py-1 rounded text-white absolute top-2 ${
                    isPositive ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {stock.stock}
                </span>

                {/* Stock Name */}
                <h3 className="mt-8 text-lg font-semibold text-left truncate">{stock.stock_name}</h3>

                {/* Stock Price */}
                <p className="text-3xl font-bold text-left ">₹{stock.price}</p>

                {/* Change Percentage */}
                <div className="flex">
                  <div
                    className={`text-sm font-semibold px-2 py-1 rounded-lg ${
                      isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <span className="mr-1">{isPositive ? '▲' : '▼'}</span>
                    <span>{Math.abs(stock.chg_percentage)}%</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>


      {/* View More Button */}
      {visibleCount < stockData.length && (
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 mr-4 text-white bg-gray-600 rounded hover:bg-red-600"
            onClick={handleViewLess}
          >
            View Less
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-green-600"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default StockData;



