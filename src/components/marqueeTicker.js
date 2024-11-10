import React, { useEffect, useState } from "react";

const stockData = [
    { symbol: "RELIANCE", price: 2540.75, percentage_change: 1.25 },
    { symbol: "TCS", price: 3555.2, percentage_change: -0.75 },
    { symbol: "INFY", price: 1440.5, percentage_change: 0.45 },
    { symbol: "HDFCBANK", price: 1595.65, percentage_change: -0.35 },
    { symbol: "ICICIBANK", price: 982.2, percentage_change: 1.05 },
    { symbol: "HINDUNILVR", price: 2440.8, percentage_change: -1.1 },
    { symbol: "KOTAKBANK", price: 1810.55, percentage_change: 0.75 },
    { symbol: "SBIN", price: 600.5, percentage_change: -0.2 },
    { symbol: "BAJFINANCE", price: 7420.8, percentage_change: -0.65 },
    { symbol: "BHARTIARTL", price: 825.2, percentage_change: 0.45 },
    { symbol: "HCLTECH", price: 1155.8, percentage_change: 1.2 },
    { symbol: "ADANIPORTS", price: 800.3, percentage_change: -0.55 },
    { symbol: "ASIANPAINT", price: 3040.5, percentage_change: 0.85 },
    { symbol: "AXISBANK", price: 925.6, percentage_change: 0.65 },
    { symbol: "BAJAJFINSV", price: 1550.3, percentage_change: -1.05 },
    { symbol: "BPCL", price: 345.6, percentage_change: 0.25 },
    { symbol: "CIPLA", price: 1090.2, percentage_change: -0.45 },
    { symbol: "COALINDIA", price: 220.4, percentage_change: 0.5 },
    { symbol: "DIVISLAB", price: 3755.1, percentage_change: -0.85 },
    { symbol: "DRREDDY", price: 5250.0, percentage_change: 1.15 },
    { symbol: "EICHERMOT", price: 3480.8, percentage_change: -0.95 },
    { symbol: "GRASIM", price: 1715.7, percentage_change: 0.55 },
    { symbol: "HDFC", price: 2845.9, percentage_change: 0.75 },
    { symbol: "HEROMOTOCO", price: 2760.4, percentage_change: -1.1 },
    { symbol: "HINDALCO", price: 450.6, percentage_change: 1.35 },
    { symbol: "ITC", price: 350.8, percentage_change: 0.4 },
    { symbol: "JSWSTEEL", price: 745.7, percentage_change: -0.25 },
    { symbol: "LT", price: 2280.6, percentage_change: 0.95 },
    { symbol: "M&M", price: 1450.3, percentage_change: 1.05 },
    { symbol: "MARUTI", price: 9500.5, percentage_change: -0.6 },
    { symbol: "NESTLEIND", price: 21700.2, percentage_change: 0.65 },
    { symbol: "NTPC", price: 210.4, percentage_change: 0.3 },
    { symbol: "ONGC", price: 175.3, percentage_change: -0.2 },
    { symbol: "POWERGRID", price: 240.2, percentage_change: 0.45 },
    { symbol: "SBILIFE", price: 1350.6, percentage_change: -0.75 },
    { symbol: "SUNPHARMA", price: 1010.8, percentage_change: 0.85 },
    { symbol: "TATASTEEL", price: 125.5, percentage_change: 1.0 },
    { symbol: "TATAMOTORS", price: 480.3, percentage_change: -0.4 },
    { symbol: "TITAN", price: 2850.9, percentage_change: 1.2 },
    { symbol: "ULTRACEMCO", price: 8550.4, percentage_change: -1.05 },
    { symbol: "UPL", price: 655.2, percentage_change: 0.5 },
    { symbol: "WIPRO", price: 420.5, percentage_change: -0.35 },
    { symbol: "ADANIENT", price: 2410.0, percentage_change: 1.15 },
    { symbol: "APOLLOHOSP", price: 5180.3, percentage_change: -0.6 },
    { symbol: "INDUSINDBK", price: 1460.5, percentage_change: 0.8 },
    { symbol: "SBICARD", price: 770.2, percentage_change: -0.45 },
    { symbol: "HDFCLIFE", price: 620.7, percentage_change: 0.3 }
  ];
    

  const MarqueeTicker = () => {
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      // Set the animation to start only after the page content is fully loaded
      setIsLoaded(true);
    }, []);
  
    return (
      <div className="py-2 overflow-hidden bg-gray-100">
        <div
          className={`marquee-wrapper ${isLoaded ? "block" : "hidden"}`}
        >
          <div className="flex marquee-content">
            {stockData.map((stock, index) => (
              <div
                key={index}
                className="flex items-center px-4 space-x-2 text-sm font-medium text-gray-800"
              >
                <span>{stock.symbol}</span>
                <span>₹{stock.price.toFixed(2)}</span>
                <span
                  className={`font-semibold ${
                    stock.percentage_change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ({stock.percentage_change > 0 ? "+" : ""}
                  {stock.percentage_change.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default MarqueeTicker;
