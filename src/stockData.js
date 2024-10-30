import React, { useEffect, useState } from 'react';

const StockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10); // State to control how many stocks to show

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
    setVisibleCount((prevCount) => prevCount + 10); // Increase visible count by 10
  };

  if (loading) return <div>Loading...</div>;
  if (!stockData.length) return <div>No data available</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-200">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">Volume Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:px-10 lg:px-60">
        {stockData.slice(0, visibleCount).map((stock, index) => (
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
            <h3 className="mt-6 text-lg font-semibold text-left truncate">{stock.stock_name}</h3>

            {/* Stock Price */}
            <p className="mt-2 text-3xl font-bold text-left">₹{stock.price}</p>

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
        ))}
      </div>

      {/* View More Button */}
      {visibleCount < stockData.length && (
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
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



// TODO: ONLY REFRESHED THE CHANGED DATA 

// import React, { useEffect, useState } from 'react';

// const StockData = () => {
//   const [stockData, setStockData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visibleCount, setVisibleCount] = useState(10);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`data/data.json?timestamp=${new Date().getTime()}`, {
//           cache: 'no-cache'
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const newData = await response.json();

//         // Check if there's any difference between new data and existing data
//         const isDataChanged = JSON.stringify(stockData) !== JSON.stringify(newData);

//         if (isDataChanged) {
//           setStockData(newData); // Update only if data has changed
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch data initially and every minute
//     fetchData();
//     const interval = setInterval(fetchData, 60000); // Fetch every minute

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [stockData]); // Adding stockData as a dependency to compare with new data

//   const handleViewMore = () => {
//     setVisibleCount((prevCount) => prevCount + 10);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!stockData.length) return <div>No data available</div>;

//   return (
//     <div className="min-h-screen p-8 bg-gray-200">
//       <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">High Volume Dashboard</h2>

//       <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:px-10 lg:px-60">
//         {stockData.slice(0, visibleCount).map((stock, index) => (
//           <div
//             key={index}
//             className={`p-4 bg-white rounded-lg shadow-lg border-b-4 ${
//               stock.chg_percentage > 0 ? 'border-green-500' : 'border-red-500'
//             } relative`}
//           >
//             <span
//               className={`text-xs font-bold px-2 py-1 rounded text-white absolute top-2 left-2 ${
//                 stock.chg_percentage > 0 ? 'bg-green-600' : 'bg-red-600'
//               }`}
//             >
//               {stock.stock}
//             </span>
//             <h3 className="mt-6 text-lg font-semibold text-left">{stock.stock_name}</h3>
//             <p className="mt-2 text-3xl font-bold text-left">₹{stock.price}</p>
//             <div className="flex mt-2">
//               <div
//                 className={`text-sm font-semibold px-2 py-1 rounded-full ${
//                   stock.chg_percentage > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                 }`}
//               >
//                 <span className="mr-1">{stock.chg_percentage > 0 ? '▲' : '▼'}</span>
//                 <span>{Math.abs(stock.chg_percentage)}%</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {visibleCount < stockData.length && (
//         <div className="flex justify-center mt-8">
//           <button
//             className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//             onClick={handleViewMore}
//           >
//             View More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockData;


