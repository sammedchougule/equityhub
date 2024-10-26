// // scraper/scrape.js
// const puppeteer = require('puppeteer');
// const fs = require('fs');

// let lastFetchedData = null; // Variable to hold the last fetched data
// let intervalId = null; // To store the interval ID

// // Function to check if the current time is between 9:15 AM and 3:30 PM
// const isMarketOpen = () => {
//   const now = new Date();
//   const start = new Date(now);
//   const end = new Date(now);

//   start.setHours(9, 15, 0);  // 9:15 AM
//   end.setHours(15, 30, 0);   // 3:30 PM

//   return now >= start && now <= end;
// };

// const scrapeData = async () => {
//   const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvDTIRMVVztLtR70Sqf2MPKNNm6rXbPDqAVnyC6jSM9ZnVmAF9HXItfkSYq3G2Eg/pubhtml?gid=137035160&single=true';
  
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: 'networkidle2' });

//   const data = await page.evaluate(() => {
//     const rows = Array.from(document.querySelectorAll('table tbody tr'));
//     const headers = Array.from(rows[0].querySelectorAll('td')).map(header => header.innerText.trim());
    
//     return rows.slice(1).map(row => {
//       const columns = Array.from(row.querySelectorAll('td'));
//       return headers.reduce((obj, header, index) => {
//         const value = columns[index] ? columns[index].innerText.trim() : null;
//         if (value) obj[header] = value;  // Only add if value is not empty
//         return obj;
//       }, {});
//     });
//   });

//   const firstObject = data; // Get the first object

//   // Save the data to a JSON file
//   fs.writeFileSync('public/data.json', JSON.stringify(firstObject, null, 2), 'utf8'); // Ensure it writes to the public directory
//   console.log(`Data fetched at ${new Date().toLocaleTimeString()} and saved to data.json: `, firstObject);

//   lastFetchedData = firstObject; // Store the last fetched data

//   await browser.close();
// };

// // Function to fetch the last data if the market is closed
// const fetchLastData = () => {
//   if (fs.existsSync('public/data.json')) {
//     const data = fs.readFileSync('public/data.json', 'utf8');
//     lastFetchedData = JSON.parse(data);
//     console.log('Market is closed. Showing last fetched data:', lastFetchedData);
//   } else {
//     console.log('No data available. Please run the script during market hours.');
//   }
// };

// // Function to handle scraping at regular intervals during market hours
// const startScraping = () => {
//   if (intervalId) clearInterval(intervalId); // Clear any existing intervals

//   intervalId = setInterval(() => {
//     if (isMarketOpen()) {
//       console.log('Market is open. Fetching new data...');
//       scrapeData();
//     } else {
//       clearInterval(intervalId); // Stop scraping when the market is closed
//       fetchLastData();  // Fetch the last data when the market is closed
//       console.log('Market is closed. No further scraping will occur.');
//     }
//   }, 50000); // Run every 50 seconds during market hours
// };

// // Initial check when the script starts
// if (isMarketOpen()) {
//   console.log('Market is open. Starting the scraping process.');
//   startScraping();
// } else {
//   fetchLastData();  // Fetch the last data when the market is closed
//   console.log('Market is closed. Data fetched only once.');
// }



// TODO: WORKING FOR PERTICULAR STOCK NOT WHOLE DATA OR STOCK FETCHING

const puppeteer = require('puppeteer');
const fs = require('fs');

let lastFetchedData = null; // Variable to hold the last fetched data
let intervalId = null; // To store the interval ID

const scrapeData = async () => {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvDTIRMVVztLtR70Sqf2MPKNNm6rXbPDqAVnyC6jSM9ZnVmAF9HXItfkSYq3G2Eg/pubhtml?gid=137035160&single=true';
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    const headers = Array.from(rows[0].querySelectorAll('td')).map(header => header.innerText.trim());
    
    return rows.slice(1).map(row => {
      const columns = Array.from(row.querySelectorAll('td'));
      return headers.reduce((obj, header, index) => {
        const value = columns[index] ? columns[index].innerText.trim() : null;
        if (value) obj[header] = value;  // Only add if value is not empty
        return obj;
      }, {});
    });
  });

  const firstObject = data.slice(1,103);

  // Save the data to a JSON file
  fs.writeFileSync('public/data/data.json', JSON.stringify(firstObject, null, 2), 'utf8');
  console.log(`Data fetched at ${new Date().toLocaleTimeString()} and saved to data.json: `, firstObject);

  lastFetchedData = firstObject; // Store the last fetched data

  await browser.close();
};

// Initial scrape without checking market hours
scrapeData();




// TODO: BREAKING THE SCRAPE INTO SMALL CHUNK FILES

// const puppeteer = require('puppeteer');
// const fs = require('fs');

// const CHUNK_SIZE = 500; // Adjust based on how much data each chunk should hold

// const scrapeData = async () => {
//   const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvDTIRMVVztLtR70Sqf2MPKNNm6rXbPDqAVnyC6jSM9ZnVmAF9HXItfkSYq3G2Eg/pubhtml?gid=137035160&single=true';
  
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: 'networkidle2' });

//   const data = await page.evaluate(() => {
//     const rows = Array.from(document.querySelectorAll('table tbody tr'));
//     const headers = Array.from(rows[0].querySelectorAll('td')).map(header => header.innerText.trim());

//     return rows.slice(1).map(row => {
//       const columns = Array.from(row.querySelectorAll('td'));
//       return headers.reduce((obj, header, index) => {
//         const value = columns[index] ? columns[index].innerText.trim() : null;
//         if (value) obj[header] = value;
//         return obj;
//       }, {});
//     });
//   });

//   // Chunk the data into multiple files
//   for (let i = 0; i < data.length; i += CHUNK_SIZE) {
//     const chunk = data.slice(i, i + CHUNK_SIZE);
//     fs.writeFileSync(`public/data_${i / CHUNK_SIZE}.json`, JSON.stringify(chunk, null, 2), 'utf8');
//     console.log(`Saved chunk ${i / CHUNK_SIZE}`);
//   }

//   await browser.close();
// };

// // Initial scrape without checking market hours
// scrapeData();
