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

      <div className="grid grid-cols-6 gap-4  px-60">
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
