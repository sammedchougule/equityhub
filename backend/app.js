const express = require('express');
const puppeteer = require("puppeteer");
const cors = require('cors'); // Import cors

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

app.get("/api/stock-data", async (req, res) => {
  try {
    console.log('fetching');
    
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvDTIRMVVztLtR70Sqf2MPKNNm6rXbPDqAVnyC6jSM9ZnVmAF9HXItfkSYq3G2Eg/pubhtml?gid=137035160&single=true";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      const headers = Array.from(rows[0].querySelectorAll("td")).map((header) =>
        header.innerText.trim()
      );

      return rows.slice(1).map((row) => {
        const columns = Array.from(row.querySelectorAll("td"));
        return headers.reduce((obj, header, index) => {
          const value = columns[index] ? columns[index].innerText.trim() : null;
          if (value) obj[header] = value;
          return obj;
        }, {});
      });
    });

    await browser.close();
    console.log("fetched");
    console.log(data);
    
    res.json(data); // Send only the first 52 items
  } catch (error) {
    console.log("error");
    console.log(error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
