// // src/StockData.js
// import React, { useEffect, useState } from 'react';

// const StockData = () => {
//     const [stockData, setStockData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch data from data.json
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/data.json'); // Fetch from public folder
//                 console.log('Response status:', response.status); // Log response status
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 console.log('Fetched data:', data); // Log the fetched data
//                 setStockData(data); // Set the fetched data
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData(); // Call the function to fetch data
//     }, []); // Empty dependency array means this runs once when the component mounts

//     if (loading) return <div>Loading...</div>; // Loading state
//     if (error) return <div>Error: {error}</div>; // Error state

//     // Destructure the data for easier access
//     const {
//         stock,
//         stock_name,
//         industry,
//         sector,
//         exchange,
//         close_yest,
//         price_open,
//         price,
//         low,
//         high,
//         chg_rs,
//         chg_percentage,
//         volume,
//         avg_volume,
//         volume_spike,
//         // month_high,
//         // month_low,
//         // year_high,
//         // year_low,
//         marketcap,
//         // year_price_history
//     } = stockData;

//     return (
//         <div className="stock-data">
//             <h1>{stock_name} ({stock})</h1>
//             <p><strong>Industry:</strong> {industry}</p>
//             <p><strong>Sector:</strong> {sector}</p>
//             <p><strong>Exchange:</strong> {exchange}</p>
//             <p><strong>Last Close Price:</strong> ₹{close_yest}</p>
//             <p><strong>Open Price:</strong> ₹{price_open}</p>
//             <p><strong>Current Price:</strong> ₹{price}</p>
//             <p><strong>Low:</strong> ₹{low}</p>
//             <p><strong>High:</strong> ₹{high}</p>
//             <p><strong>Change (₹):</strong> {chg_rs}</p>
//             <p><strong>Change (%):</strong> {chg_percentage}</p>
//             <p><strong>Volume:</strong> {volume}</p>
//             <p><strong>Average Volume:</strong> {avg_volume}</p>
//             <p><strong>Volume Spike:</strong> {volume_spike}</p>
//             <p><strong>Market Cap:</strong> ₹{marketcap} Crores</p>
//         </div>
//     );
// };

// export default StockData;




// TODO: ANOTHER DASHBAORD 

import React, { useEffect, useState } from 'react';


const StockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data.json?timestamp=${new Date().getTime()}`, {
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

  if (loading) return <div>Loading...</div>;
  if (!stockData.length) return <div>No data available</div>;

  return (
    <div className="bg-gray-200 p-8 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">High Volume Dashboard</h2>

      <div className="grid grid-cols-5 gap-4  px-40">
        {stockData.map((stock, index) => (
          <div
            key={index}
            className={`p-4 bg-white rounded-lg shadow-lg border-b-4 ${
              stock.chg_percentage > 0 ? 'border-green-500' : 'border-red-500'
            } relative`}
          >
            {/* Stock Ticker */}
            <span
              className={`text-xs font-bold px-2 py-1 rounded text-white absolute top-2 left-2 ${
                stock.chg_percentage > 0 ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {stock.stock}
            </span>

            {/* Stock Name */}
            <h3 className="text-lg font-semibold mt-6 text-left">{stock.stock_name}</h3>

            {/* Stock Price */}
            <p className="text-3xl font-bold mt-2 text-left">₹{stock.price}</p>

            {/* Change Percentage */}
            <div className="mt-2 flex">
              <div
                className={` text-sm font-semibold px-2 py-1 rounded-full ${
                  stock.chg_percentage > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                <span className="mr-1">{stock.chg_percentage > 0 ? '▲' : '▼'}</span>
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






// TODO: SIMPLYFYING THE FETCH DATA USING EXPRESS LOCALHOST:5000

// import React, { useEffect, useState } from 'react';

// const StockData = () => {
//   const [stockData, setStockData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:5000/data.json');
//       const data = await response.json();
//       setStockData(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {stockData.length > 0 ? (
//         stockData.map((stock, index) => (
//           <div key={index}>
//             <h1>{stock.stock_name} ({stock.stock})</h1>
//             <p>Industry: {stock.industry}</p>
//             <p>Sector: {stock.sector}</p>
//             <p>Exchange: {stock.exchange}</p>
//             <p>Closing Price: {stock.close_yest}</p>
//           </div>
//         ))
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default StockData;
