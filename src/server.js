const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 1000;
const FLYER_URL = "https://keystoneschoolofengineering.42web.io/flyers.html"; // Update this URL

app.get("/generate-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(FLYER_URL, { waitUntil: "load" });

    // Convert to PDF
    const pdf = await page.pdf({ format: "A4" });

    await browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    res.status(500).send("Error generating PDF: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
