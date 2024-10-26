import React, { useState } from 'react';

const StockFilters = ({ onFilterChange }) => {
  const [priceFilter, setPriceFilter] = useState('all');
  const [chgPercentageFilter, setChgPercentageFilter] = useState('all');

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
    onFilterChange(e.target.value, chgPercentageFilter);
  };

  const handleChgPercentageChange = (e) => {
    setChgPercentageFilter(e.target.value);
    onFilterChange(priceFilter, e.target.value);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <label className="mr-2">Price:</label>
        <select
          value={priceFilter}
          onChange={handlePriceChange}
          className="p-1 border rounded"
        >
          <option value="all">All</option>
          <option value="high">High to Low</option>
          <option value="low">Low to High</option>
        </select>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Change Percentage:</label>
        <select
          value={chgPercentageFilter}
          onChange={handleChgPercentageChange}
          className="p-1 border rounded"
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
      </div>
    </div>
  );
};

export default StockFilters;
