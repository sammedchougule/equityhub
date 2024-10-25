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
    <div>
      <h2>Stock Data</h2>
      {stockData.map((stock, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <h3>{stock.stock_name} ({stock.stock})</h3>
          <p>Industry: {stock.industry}</p>
          <p>Sector: {stock.sector}</p>
          <p>Exchange: {stock.exchange}</p>
          <p>Closing Price: ₹ {stock.close_yest}</p>
          <p>Current Price: ₹ {stock.price}</p>
          <p>Change (Rs): ₹ {stock.chg_rs}</p>
          <p>Change (%): {stock.chg_percentage}%</p>
        </div>
      ))}
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
