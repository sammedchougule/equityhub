import React, { useState, useEffect } from 'react';
import StockFilters from './stockFilters';

const StockDashboard = ({ stockData = [] }) => {
  const [filteredStocks, setFilteredStocks] = useState(stockData);
  
  useEffect(() => {
    setFilteredStocks(stockData); // Update filtered stocks when stockData is updated
  }, [stockData]);

  const handleFilterChange = (priceFilter, chgPercentageFilter) => {
    let filtered = [...stockData];

    // Price filter
    if (priceFilter === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceFilter === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    }

    // Change percentage filter
    if (chgPercentageFilter === 'positive') {
      filtered = filtered.filter(stock => stock.chg_percentage > 0);
    } else if (chgPercentageFilter === 'negative') {
      filtered = filtered.filter(stock => stock.chg_percentage < 0);
    }

    setFilteredStocks(filtered);
  };

  return (
    <div>
      <StockFilters onFilterChange={handleFilterChange} />
      <div className="flex flex-wrap justify-center gap-10 px-4 sm:px-32 lg:px-32">
        {filteredStocks && filteredStocks.map((stock, index) => {
          const isPositive = stock.chg_percentage > 0;
          return (
            <div
              key={index}
              className={`p-2 bg-white rounded-lg shadow-lg border-b-4 ${
                isPositive ? 'border-green-500' : 'border-red-500'
              } relative flex flex-col justify-between overflow-hidden
                basis-1/4 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/6`}
              style={{ height: '150px' }}
            >
              {/* Stock Ticker */}
              <span
                aria-label={`${stock.stock} ticker`}
                className={`text-xs font-bold px-2 py-1 rounded text-white absolute top-2  ${
                  isPositive ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {stock.stock}
              </span>

              {/* Stock Name */}
              <h3 className="mt-6 text-lg font-semibold text-left truncate">{stock.stock_name}</h3>

              {/* Stock Price */}
              <p className="mt-2 text-lg font-bold text-left">₹{stock.price}</p>

              {/* Change Percentage */}
              <div className="flex mt-2">
                <div
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
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
    </div>
  );
};

export default StockDashboard;
