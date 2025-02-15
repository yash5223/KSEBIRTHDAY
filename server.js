const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;
const FLYER_URL = "https://yash5223.github.io/KSEBIRTHDAY/flyers.html"; // ✅ Replace with your frontend URL

// ✅ Enable CORS for GitHub Pages
app.use(cors({
    origin: "https://yash5223.github.io", // ✅ Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

// ✅ Generate PDF from the flyer URL
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

// ✅ Email Sending API
app.post("/send-email", (req, res) => {
    console.log("Received email request:", req.body);
    res.status(200).send("Email sent successfully!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
