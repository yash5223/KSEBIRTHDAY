const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config(); // ✅ Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const FLYER_URL = "https://yash5223.github.io/KSEBIRTHDAY/flyers.html"; // ✅ Update this if needed

// ✅ Enable CORS for GitHub Pages
app.use(cors({
    origin: "https://yash5223.github.io", // ✅ Allow your frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

// ✅ Generate PDF from the flyer URL
const generatePDF = async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // ✅ Required for Render
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined, // ✅ Ensure Render finds Chrome
    });

    const page = await browser.newPage();
    await page.goto(FLYER_URL, { waitUntil: "load" });

    // Convert to PDF
    const pdf = await page.pdf({ format: "A4" });
    await browser.close();
    return pdf;
};

// ✅ API to generate PDF (for testing)
app.get("/generate-pdf", async (req, res) => {
    try {
        const pdf = await generatePDF();
        res.contentType("application/pdf");
        res.send(pdf);
    } catch (error) {
        res.status(500).send("Error generating PDF: " + error.message);
    }
});

// ✅ Email Sending API
app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
    
    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Missing email parameters" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // ✅ Use environment variables
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const pdf = await generatePDF();
        const mailOptions = {
            from: process.env.EMAIL_USER, // ✅ Use env variable
            to,
            subject,
            text,
            attachments: [
                {
                    filename: "flyer.pdf",
                    content: pdf,
                    contentType: "application/pdf"
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email with flyer sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error sending email: " + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
