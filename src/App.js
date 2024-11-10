
import React, { useState, useEffect } from 'react';
import './App.css';
import StockDashboard from './components/stockDashboard';
import MarqueeTicker from './components/marqueeTicker';

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
      <MarqueeTicker />
      <StockDashboard stockData={stockData} />
    </div>
  );
}

export default App;
