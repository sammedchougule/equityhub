// import StockData from './stockData';
// import './App.css';
// import StockDashboard from './components/stockDashboard';


// function App() {
//   return (
//     <div className="App">
//       <StockDashboard  stockData={stockData} />
//       {/* <StockData /> */}
      

//     </div>
//   );
// }

// export default App;


// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import StockDashboard from './components/stockDashboard';

function App() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Fetch data from public/data/data.json
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => setStockData(data))
      .catch(error => console.error('Error fetching stock data:', error));
  }, []);

  return (
    <div className="App">
      <StockDashboard stockData={stockData} />
    </div>
  );
}

export default App;
