import React from 'react';

const StockCard = React.memo(({ stock }) => {
  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-lg border-b-4 ${
        stock.chg_percentage > 0 ? 'border-green-500' : 'border-red-500'
      } relative`}
    >
      {/* Stock Ticker */}
      <span
        className={`text-sm font-bold px-2 py-1 rounded text-white absolute top-2 left-2 ${
          stock.chg_percentage > 0 ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        {stock.stock}
      </span>

      {/* Stock Name */}
      <h3 className="mt-6 text-lg font-semibold text-left truncate">{stock.stock_name}</h3>

      {/* Stock Price */}
      <p className="mt-2 text-2xl font-bold text-left">₹{stock.price}</p>

      {/* Change Percentage */}
      <div className="flex mt-2">
        <div
          className={`text-sm font-semibold px-2 py-1 rounded-full ${
            stock.chg_percentage > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          <span className="mr-1">{stock.chg_percentage > 0 ? '▲' : '▼'}</span>
          <span>{Math.abs(stock.chg_percentage)}%</span>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => JSON.stringify(prevProps.stock) === JSON.stringify(nextProps.stock));

export default StockCard;
